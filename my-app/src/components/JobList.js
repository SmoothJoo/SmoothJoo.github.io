import React, {Component} from 'react';
import JobItem from './JobItem';
import PropTypes from 'prop-types';

class JobList extends Component {
  render(){
  	return this.props.joblist.map((joblist) => (
  		<JobItem key={joblist.id} joblist = {joblist} 
  		toggleComplete={this.props.toggleComplete} delItem={this.props.delItem}/>
  	));
  }

}


JobList.propTypes = {
	joblist: PropTypes.array.isRequired
}

export default JobList;
