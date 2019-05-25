import React from 'react';
// import Search from './Search.js';
// import Table from './Table.js';
import TableRows from './TableRows.js';
import axios from 'axios';

export default class App extends React.Component {

constructor(props) {
    super(props);
    this.state = {
    data: [],
    page:1,
    maxPage:67,
    filtered:[],
    query:"",
    currentPage:[]
  };

    this.handleQuery = this.handleQuery.bind(this);
    this.searchData = this.searchData.bind(this);
    this.changePage = this.changePage.bind(this);
    this.createTable = this.createTable.bind(this);

  }
  handleQuery(event){//update search queary in search bar
    this.setState({query:event.target.value});
  }
  searchData(){
    let query = this.state.query;
    let filtered=[];
    if(!query)
      {
        this.setState({filtered:[]});
        console.log(this.state);
      }
  else{
      query = query[0].toUpperCase()+query.substring(1);
      filtered = this.state.data.filter((e)=>e.name.includes(query));
      this.setState({filtered});
    }
  if(filtered.length!==0)
    this.setState((state, props)=>({
      currentPage:filtered.slice(0,15),
      maxPage:Math.ceil(filtered.length/15)
    }));
  else
    this.setState((state, props)=>({currentPage:state.data.slice(0,15)}));
  }
  changePage(changeBy){
    let next = this.state.page+changeBy;
    this.setState({page:next});
    if(this.state.filtered.length===0)
      this.setState((state, props)=>({currentPage:state.data.slice((next-1)*15,next*15)}));

    else
      this.setState((state, props)=>({currentPage:state.filtered.slice((next-1)*15,next*15)}));

    // let currentPage = this.state.data;
    // console.log(this.state);
  }
  createTable(){
    let rows=[];
    let pageNum = this.state.page;
    for(let i=(pageNum-1)*15 ; i<pageNum*15 ; i++)
      rows.push(<tr>{i}</tr>);
    return rows;
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

        console.log("state changed",this.state);
      })
  }
    render(){
      console.log("render");
      // this.createTable()
      return (
      <div className="App">
        <header>Meteorite Explorer</header>
        <div>
          <input
            type  = "text"
            name  = "search-bar"
            value = {this.state.query}
            onChange = {this.handleQuery}
           />
          <button onClick={this.searchData}>
          Search</button>
        </div>


        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Id</th>
              <th>nametype</th>
              <th>recclass</th>
              <th>mass(g)</th>
              <th>fall</th>
              <th>year</th>
              <th>reclat</th>
              <th>reclong</th>
            </tr>
          </thead>
          <tbody>
            {
              // this.createTable()
              // console.log(this.state.data)
              this.state.currentPage.map((e, i)=>{
                return <TableRows key={i}  data={e}/>
              })
            }
          </tbody>
        </table>
        <div>
          page number :
          <button
            onClick = {()=>{this.changePage(-1)}}
            disabled = {this.state.page===1}
            >Previous</button>
          <button
            onClick={()=>{this.changePage(1)}}
            disabled = {this.state.page===this.state.maxPage}
            >Next</button>
        </div>
      </div>
    );
  }
}

// export default App;
