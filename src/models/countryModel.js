const Model = require('../models/model').default

export default class Country extends Model {
    static get tableName() {
        return 'country';
    }

    static get idColumn() {
        return 'id';
    }
}