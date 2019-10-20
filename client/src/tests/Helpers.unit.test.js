import { scoreFormatter, formatCreatedDate } from '../utils/helpers';
import moment from 'moment';

test('Testing score formatter', () => {
	expect(scoreFormatter(3001)).toBe('3k')
	expect(scoreFormatter(-1)).toBe(-1)
	expect(scoreFormatter(99999999)).toBe('100000k')
	expect(scoreFormatter(-99999999)).toBe('-100000k')
	expect(scoreFormatter(751)).toBe(751)
	expect(scoreFormatter(1251)).toBe('1.3k')
})

test('Testing created date formatter', () => {
	let dateString = moment.unix(1571241859);
	let createdAt = dateString._d;
	let timeAgo = moment(createdAt).fromNow();
	
	expect(formatCreatedDate(1571241859)).toBe(timeAgo)
})