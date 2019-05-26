import React from 'react';
import Search from './Search.js';
import Table from './Table.js';
import Pagination from './Pagination.js';
import axios from 'axios';

export default class App extends React.Component {

constructor(props) {
    super(props);
    this.state = {
    data: [],//stores whole data
    page:1,//tells currentPage
    maxPage:67,//tells maxPages
    filtered:[],//save filtered data on basis of search query
    query:"",//saves search query
    currentPage:[]//data to be shown on current page
  };

    this.handleQuery = this.handleQuery.bind(this);
    this.searchData = this.searchData.bind(this);
    this.changePage = this.changePage.bind(this);
  }


  handleQuery(event){//update search query in search bar
    this.setState({query:event.target.value});
  }


  searchData(){//to search data from data
    let query = this.state.query;
    let filtered=[];
    if(!query)
      {
        this.setState({filtered:[]});
      }
  else{
      query = query[0].toUpperCase()+query.substring(1).toLowerCase();
      console.log(query);
      filtered = this.state.data.filter((e)=>e.name.includes(query));
      this.setState({filtered});
    }
  if(filtered.length!==0)
    this.setState((state, props)=>({
      currentPage:filtered.slice(0,15),
      maxPage:Math.ceil(filtered.length/15)
    }));
  else
  {
    alert("No such Value");
    this.setState((state, props)=>({
      currentPage:state.data.slice(0,15),
      maxPage:Math.ceil(state.data.length/15)
    }));
  }
}


  changePage(changeBy){
    let next = this.state.page+changeBy;
    this.setState({page:next});
    if(this.state.filtered.length===0)
      this.setState((state, props)=>({currentPage:state.data.slice((next-1)*15,next*15)}));
    else
      this.setState((state, props)=>({currentPage:state.filtered.slice((next-1)*15,next*15)}));
  }


  componentDidMount() {
    axios.get(`https://data.nasa.gov/resource/gh4g-9sfh.json`)
      .then(res => {
        this.setState(
          {
            data:res.data,
            currentPage:res.data.slice(0,15),
            maxPage:Math.ceil(res.data.length/15)
          });

      })
  }


    render(){
      // console.log("render");
      // this.createTable()
      return (
      <div className="App container">
        <h1 className= "text-center">Meteorite Explorer</h1>
        <Search
          query={this.state.query}
          handleQuery = {this.handleQuery}
          searchData = {this.searchData}
        />
      <Table currentPage = {this.state.currentPage}/>
      <Pagination
        page={this.state.page}
        maxPage={this.state.maxPage}
        changePage={this.changePage}
      />

      </div>
    );
  }
}

// export default App;
