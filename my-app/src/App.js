import React, {Component} from 'react';
import Header from './components/layout/Header';
import Category from './components/layout/Category';
import JobList from './components/JobList';
import AddItem from './components/AddItem';
import './App.css';
import uuid from 'uuid';

class App extends Component{

	state={
		joblist: [
		{
			id: 1,
			title: 'Web designer',
			companyName: 'Big red recruitment',
			dateApplied: '08/22/2019',
			completed: false
		},
		{
			id: 2,
			title: 'Web designer',
			companyName: 'red recruitment',
			dateApplied: '09/22/2019',
			completed: false
			
		},
		{
			id: 3,
			title: 'Web designer',
			companyName: 'Big recruitment',
			dateApplied: '09/22/2019',
			completed: false
			
		},
		]
	}
	//toggle complete
	toggleComplete= (id) => {
		this.setState({joblist: this.state.joblist.map(joblist => {
			if(joblist.id === id){
				joblist.completed =! joblist.completed;
			}
			return joblist;
		}) });
	}

	delItem = (id) => {
		this.setState({joblist: [...this.state.joblist.filter(joblist => joblist.id != id)]})
	}

	addItem = (title, companyName,dateApplied ) =>{
		const newJobList = {
			id: uuid.v4(),
			title,
			companyName,
			dateApplied,
			completed: false
		}
		this.setState({ joblist: [... this.state.joblist, newJobList]});
		console.log(newJobList);
	}

	render(){
		return (
		    <div className="App">
		    <Header/>
		    <Category/>
		    <JobList joblist={this.state.joblist} toggleComplete={this.toggleComplete} 
		    delItem = {this.delItem}/>
		    <AddItem addItem={this.addItem}/>
		    </div>
		  );
	}
}


export default App;
