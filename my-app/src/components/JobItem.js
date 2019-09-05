import React, {Component} from 'react';
import PropTypes from 'prop-types';

export class JobItem extends Component {
  getStyle = () => {
  	if (this.props.joblist) {
  		return{
  			background: '#f4f4f4',
  			padding: '10px',
  			borderBottom: '1px #ccc dotted',
  			textDecoration:this.props.joblist.completed? 
  			'line-through' : 'none'
  			}
  		}
  	}


  render(){
  	const {id, title, companyName, dateApplied } = this.props.joblist;
  	return(
  		<div style = {this.getStyle()}>
  			<p>
  			<input type="checkbox" onChange={this.props.toggleComplete.bind(this, id)}/>{' '}
  			{title} &emsp; {companyName} &emsp; {dateApplied}
        <button onClick={this.props.delItem.bind(this, id)} style={btnStyle}>x</button>
  			</p>
  		</div>
  	)
  }

}


JobItem.propTypes = {
	joblist: PropTypes.object.isRequired
}

const btnStyle = {
  background : '#ff0000',
  color: '#fff',
  border: 'none',
  padding: '5px 10px',
  borderRadius: '50%',
  cursor:'pointer',
  float:'right'
}

export default JobItem;
