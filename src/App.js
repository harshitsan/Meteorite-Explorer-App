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
    currentPage:[],//data to be shown on current page
    showingEntries:10
  };

    this.handleQuery = this.handleQuery.bind(this);
    this.searchData = this.searchData.bind(this);
    this.changePage = this.changePage.bind(this);
  }


  handleQuery(event){//update search query in search bar
    this.setState({query:event.target.value});
  }


  searchData(){//to search data from data
    let query = this.state.query.trim();
    let filtered=[];
    if(!query)
      {
        this.setState({
          filtered:[],
          showingEntries:10,
          page:1
        });
      }
  else{
      query = query.toLowerCase();
      // console.log(query);
      filtered = this.state.data.filter((e)=>e.name.toLowerCase().includes(query));
      this.setState({filtered,page:1});
    }
  if(filtered.length!==0)
  {
    let showingEntries = this.state.page*10;
    if (showingEntries > filtered.length)
      {
        showingEntries  = filtered.length;
      }
    this.setState((state, props)=>({
      currentPage:filtered.slice(0,10),
      maxPage:Math.ceil(filtered.length/10),
      showingEntries
    }));
  }
  else
  {
    alert("No such Value");
    this.setState((state, props)=>({
      currentPage:state.data.slice(0,10),
      maxPage:Math.ceil(state.data.length/10),
      showingEntries:0
    }));
  }
}


  changePage(changeBy){
    let next = this.state.page+changeBy;
    let showingEntries = next*10;

    this.setState({page:next});
    let filteredLength = this.state.filtered.length;
    if(filteredLength===0)
      this.setState((state, props)=>(
        {
          currentPage:state.data.slice((next-1)*10,next*10),
          showingEntries:state.page*10
        }));
    else
    {
      if (showingEntries > filteredLength)
      {
        showingEntries  = filteredLength;
      }
      this.setState((state, props)=>({
        currentPage:state.filtered.slice((next-1)*10,next*10),
        showingEntries
      }));
  }
}


  componentDidMount() {
    axios.get(`https://data.nasa.gov/resource/gh4g-9sfh.json`)
      .then(res => {
        this.setState(
          {
            data:res.data,
            currentPage:res.data.slice(0,10),
            maxPage:Math.ceil(res.data.length/10)
          });
          console.log(this.state.data);
      })
  }


    render(){
      // console.log("render");
      // this.createTable()
      return (
      <div className="App container">
        <Search
          query={this.state.query}
          handleQuery = {this.handleQuery}
          searchData = {this.searchData}
        />
        {"showing " +((this.state.page-1)*10+1) +"-"+ this.state.showingEntries+ " entries of "}
        {this.state.filtered.length ? this.state.filtered.length : this.state.data.length}
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
