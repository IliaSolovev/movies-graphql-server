const graphql = require('graphql');

const {GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt, GraphQLList, GraphQLNonNull, GraphQLFloat} = graphql;

const Movies = require('../models/movie');

const MovieType = new GraphQLObjectType({
  name: 'Movie',
  fields: () => ({
    id: {type: GraphQLID},
    title: {type: GraphQLString},
    tagline: {type: GraphQLString},
    release_date: {type: GraphQLString},
    poster_path: {type: GraphQLString},
    overview: {type: GraphQLString},
    genres: {type: new GraphQLList(GraphQLString)},
    vote_average: {type: GraphQLFloat},
    vote_count: {type: GraphQLInt},
    budget: {type: GraphQLInt},
    revenue: {type: GraphQLInt},
    runtime: {type: GraphQLInt},
  }),
});

const Query = new GraphQLObjectType({
  name: 'Query',
  fields: {
    movie: {
      type: MovieType,
      args: {id: {type: GraphQLID}},
      resolve(parent, {id}) {
        return Movies.findById(id);
      },
    },
    movies: {
      type: new GraphQLList(MovieType),
      args: {
        filter: {type: new GraphQLNonNull(GraphQLString)},
        searchType: {type: new GraphQLNonNull(GraphQLString)},
        searchValue: {type: new GraphQLNonNull(GraphQLString)}
        },
      resolve(parent, {filter, searchType, searchValue}){
        return Movies.find({
          [searchType]: new RegExp(`${searchValue}`,'i')
        },null, {limit: 10, sort: {[filter]: 'desc'}});
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: Query,
});
