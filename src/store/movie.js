import axios from 'axios'

const _defaultMessage = 'Search for the movie title!'

export default {
    namespaced : true,
    state : () => {
        return {
            movies : [],
            message : _defaultMessage,
            loading : false,
            theMovie : {}
        }
    },
    gatters : {
        movieIds(state) {
            return state.movies.map(m => m.imdbID)
        }
    },
    mutations : {
        updateState(state, payload) {
            Object.keys(payload).forEach(key => {
                state[key] = payload[key]
            })
        },
        resetMovies(state) {
            state.movies = []
            state.message = _defaultMessage
            state.loading = false
        }
    },
    actions : {
        async searchMovies({state, commit}, payload) {
            if (state.loading) return

            commit('updateState', {
                message : '',
                loading : true
            })

            try {
                const res = await _fetchMovie({
                    ...payload,
                });
                
                const {Search, totalResults} = res.data
                console.log(Search, totalResults)
    
                commit('updateState', {
                    movies : Search
                })
    
                const total = parseInt(totalResults, 10)
                const pageLength = Math.ceil(total / 10)
                console.log(pageLength)
    
                if (pageLength > 1) {
                    for (let page = 2; page <= pageLength; page++) {
                        if (page > payload.number / 10) break
    
                        const res = await _fetchMovie({
                            ...payload,
                            page : page
                        });
                        const {Search} = res.data
    
                        commit('updateState', {
                            movies : [...state.movies, ...Search]
                        })
                    }
                }
                console.log(state.movies)
            }
            catch ({message}) {
                commit('updateState', {
                    movies : [],
                    message
                })
            }
            finally {
                commit('updateState', {
                    loading : false
                })
            }
        },
        async searchMovieWithId({state, commit}, payload) {
            if (state.loading) return

            commit('updateState', {
                message : '',
                loading : true
            })

            try {
                const res = await _fetchMovie(payload)
                commit('updateState', {
                    theMovie : res.data
                })                
                console.log(state.theMovie)
            }
            catch (error) {
                commit('updateState', {
                    theMovie : {}
                })
            }
            finally {
                commit('updateState', {
                    loading : false
                })
            }
        }
    }
}

async function _fetchMovie(payload) {
    return await axios.post('/netlify/functions/movie', payload)

    // const {title, type, year, page, id} = payload;
    // const OMDB_API_KEY = '7035c60c';
    // const url = id
    //     ?`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&i=${id}`
    //     :`https://www.omdbapi.com/?apikey=${OMDB_API_KEY}&s=${title}&type=${type}&y=${year}&page=${page}`;

    // return new Promise((resolve, reject) => {
    //     axios.get(url)
    //         .then(res => {
    //             if (res.data.Error) {
    //                 reject(res.data.Error)
    //             }
    //             resolve(res)
    //         })
    //         .catch(err => {
    //             reject(err.message)
    //         })
    // })
}