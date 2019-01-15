/**
 * We can't just use string comparison for figuring out whether two queries are same.
 * For example two inserts might differ in data that it's trying to insert.
 * This module deals with figuring out if two queries are same.
 */