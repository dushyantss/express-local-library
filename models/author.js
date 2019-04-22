const mongoose = require('mongoose');
const moment = require('moment');

const DATE_FORMAT = 'MMMM Do, YYYY';

const AuthorSchema = new mongoose.Schema({
    first_name: {type: String, required: true, max: 100},
    family_name: {type: String, required: true, max: 100},
    date_of_birth: {type: Date},
    date_of_death: {type: Date},
});

// Virtual for author's full name
AuthorSchema.virtual('name').get(function () {
    return `${this.family_name}, ${this.first_name}`;
});

// Virtual for author's lifespan
AuthorSchema.virtual('lifespan').get(function () {
  const date_of_birth_formatted = this.date_of_birth ? moment(this.date_of_birth).format(DATE_FORMAT) : '';
  const date_of_death_formatted = this.date_of_death ? moment(this.date_of_death).format(DATE_FORMAT) : '';
    return `${date_of_birth_formatted} - ${date_of_death_formatted}`;
});

// Virtual for author's url
AuthorSchema.virtual('url').get(function () {
    return `/catalog/author/${this._id}`;
});

// Virtual for formatted date_of_birth
AuthorSchema.virtual('date_of_birth_formatted').get(function () {
  return this.date_of_birth ? moment(this.date_of_birth).format(DATE_FORMAT) : '';
});

// Virtual for formatted date_of_death
AuthorSchema.virtual('date_of_death_formatted').get(function () {
  return this.date_of_death ? moment(this.date_of_death).format(DATE_FORMAT) : '';
});

module.exports = mongoose.model('Author', AuthorSchema);
