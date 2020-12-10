import { belongsTo, Model, hasMany } from 'miragejs'

const models = {
  objective: Model.extend({
    keyResults: hasMany(),
    cycle: belongsTo(),
  }),
  keyResult: Model.extend({
    owner: belongsTo('user'),
    objective: belongsTo(),
    team: belongsTo(),
    confidenceReports: hasMany(),
    progressReports: hasMany(),
    policies: belongsTo(),
  }),
  progressReport: Model.extend({
    user: belongsTo(),
    keyResult: belongsTo(),
  }),
  confidenceReport: Model.extend({
    user: belongsTo(),
    keyResult: belongsTo(),
  }),
  keyResultView: Model.extend({
    user: belongsTo(),
    keyResults: hasMany(),
  }),
  company: Model.extend({
    teams: hasMany(),
    cycles: hasMany(),
  }),
  cycle: Model.extend({
    company: belongsTo(),
    objectives: hasMany(),
  }),
  team: Model.extend({
    keyResults: hasMany(),
    company: belongsTo(),
    users: hasMany(),
  }),
  user: Model.extend({
    keyResults: hasMany(),
    progressReports: hasMany(),
    confidenceReports: hasMany(),
    teams: hasMany(),
  }),
  policy: Model,
}

export default models
