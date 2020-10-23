const Model = require('../models/model').default;
const UserType = require('../models/usersTypeModel').default;

export default class Users extends Model {
    static get tableName() {
        return 'movie_details';
    }

    static get idColumn() {
        return 'id';
    }

    static get relationMappings() {
        return {
            usersType: {
                relation: Model.BelongsToOneRelation,
                modelClass: UserType,
                join: {
                    from: 'user_type.id',
                    to: 'users.userstypeid'
                }
            }
        }
    }
}

