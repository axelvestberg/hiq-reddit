import moment from 'moment';

export const scoreFormatter = (num) => {
	return Math.abs(num) > 999 ? Math.sign(num)*((Math.abs(num)/1000).toFixed(1)) + 'k' : Math.sign(num)*Math.abs(num)
}	

export const formatCreatedDate = (date) => {
	let dateString = moment.unix(date);
	let createdAt = dateString._d;
	let timeAgo = moment(createdAt).fromNow();
	return timeAgo;
}