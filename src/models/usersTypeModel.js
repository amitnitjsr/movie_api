const Model = require('../models/model').default;

export default class UserType extends Model {
    static get tableName() {
        return 'user_type';
    }

    static get idColumn() {
        return 'id';
    }
}