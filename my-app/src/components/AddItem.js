import React, {Component} from 'react';

export class AddItem extends Component {
	state ={
		title: '',
		companyName: '',
		dateApplied: ''
	}

	onSubmit= (e) =>{
		e.preventDefault();
		this.props.addItem(this.state.title, this.state.companyName, this.state.dateApplied);
		this.setState({ title: ''});
		this.setState({ companyName: ''});
		this.setState({ dateApplied: ''});
	}
	onChange = (e) => this.setState({ [e.target.name] : e.target.value});

	render(){
	  	return (
	  		<form onSubmit={this.onSubmit} style={{flex:'10', padding: '15px', margin: '5px 10px'}}>
			  	
		  		<input
			  		type="text"
			  		name="title"
			  		placeholder = "Add title you applied.."
			  		style={{margin: '5px 0px'}}
			  		value={this.state.title}
			  		onChange={this.onChange}
			  	/>
			  	<input
			  		type="text"
			  		name="companyName"
			  		placeholder = "Add company name.."
			  		value={this.state.companyName}
			  		style={{margin: '5px'}}
			  		onChange={this.onChange}
			  	/>
			  	<input
			  		type="date"
			  		name="dateApplied"
			  		value={this.state.dateApplied}
			  		onChange={this.onChange}
			  	/>
			  	<input
			  		type = "submit"
			  		value ="Submit"
			  		className="btn"	
		  		/>
	  		</form>
	  	)

  }

}


export default AddItem;