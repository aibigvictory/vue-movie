<template>
    <div class="container" @click="tmp">
        <template v-if="loading">
            <div class="skeletons">
                <div class="skeleton poster"></div>
                <div class="specs">
                    <div class="skeleton title"></div>
                    <div class="skeleton spec"></div>
                    <div class="skeleton plot"></div>
                    <div class="skeleton etc"></div>
                    <div class="skeleton etc"></div>
                    <div class="skeleton etc"></div>
                </div>
            </div>
            <Loader
            :size="3"
            :z-index="9"
            fixed/>
        </template>
        <div class="movie-details" v-else>
            <div class="poster"
            :style="{backgroundImage : `url(${requestDiffSizeImage(theMovie.Poster, 700)})`}">
                <!-- <Loader v-if="imageLoading" absolute/> -->
            </div>
            <div class="specs">
                <div class="title">
                    {{theMovie.Title}}
                </div>
                <div class="labels">
                    <span>{{theMovie.Released}}</span>
                    <span>{{theMovie.Runtime}}</span>
                    <span>{{theMovie.Country}}</span>
                </div>
                <div class="plot">
                    {{theMovie.Plot}}
                </div>
                <div class="ratings">
                    <h3>Ratings</h3>
                    <div class="rating-wrap">
                        <div class="rating"
                        v-for="{Source: name, Value: score} in theMovie.Ratings" :key="name"
                        :title="name">
                            <img :src="`https://raw.githubusercontent.com/ParkYoungWoong/vue3-movie-app/master/src/assets/${name}.png`" 
                            :alt="name">
                            <span>{{score}}</span>
                        </div>
                    </div>
                </div>
                <div>
                    <h3>Actors</h3>
                    {{theMovie.Actors}}
                </div>
                <div>
                    <h3>Director</h3>
                    {{theMovie.Director}}
                </div>
                <div>
                    <h3>Production</h3>
                    {{theMovie.Production}}
                </div>
                <div>
                    <h3>Genre</h3>
                    {{theMovie.Genre}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Loader from '../components/Loader.vue'

export default {
    methods : {
        requestDiffSizeImage(url, size) {
            //return url.replace('SX300',`SX${size}`)
            if (!url || url === 'N/A') {
                this.imageLoading = false
                return ''
            }
            const src = url.replace('SX300',`SX${size}`)
            this.$loadImage(src)
                .then(() => {
                    this.imageLoading = false
                })
            return src
        }
    },
    created() {
        console.log(this.$route)
        this.$store.dispatch('movie/searchMovieWithId', {
            id : this.$route.params.id
        })
    },
    components : {
        Loader
    },
    data() {
        return {
            imageLoading : true
        }
    },
    computed : {
        theMovie() {
            return this.$store.state.movie.theMovie
        },
        loading() {
            return this.$store.state.movie.loading
        }
    }
}
</script>

<style lang="scss" scoped>
@import '../scss/main.scss';

.container{
    padding-top: 40px;
}
.skeletons{
    display: flex;
    .poster{
        position: relative;
        flex-shrink: 0;
        width: 500px;
        height: 500px * 3 / 2;
        margin-right: 70px;
    }
    .specs{
        flex-grow: 1;
        > div {
            margin-top: 20px;
        }
    }
    .skeleton{
        border-radius: 10px;
        background: $gray-200;
        
        &.title {
            width: 80%;
            height: 70px;
            margin-top: 0;
        }
        &.spec {
            width: 60%;
            height: 30px;
        }
        &.plot {
            width: 100%;
            height: 250px;
        }
        &.etc {
            width: 50%;
            height: 50px;
        }
    }
}
.movie-details{
    display: flex;
    color: $gray-600;
    .poster{
        flex-shrink: 0;
        width: 500px;
        height: 500px * 3 / 2;
        margin-right: 70px;
        border-radius: 10px;
        background-color: $gray-200;
        background-size: cover;
        background-position: center;
    }
    .specs{
        flex-grow: 1;
        .title{
            color: $black;
            font-family: 'Oswald', sans-serif;
            font-size: 70px;
            line-height: 1;
            margin-bottom: 30px;
        }
        .labels{
            color: $primary;
            span{
                &::after{
                    content: "\00b7";
                    margin: 0 6px;
                }
                &:last-child::after{
                    display: none;
                }
            }
        }
        .plot{
            margin-top: 20px;
        }
        .ratings{
            .rating-wrap{
                display: flex;
                .rating{
                    display: flex;
                    align-items: center;
                    margin-right: 32px;
                    img{
                        height: 30px;
                        flex-shrink: 0;
                        margin-right: 6px;
                    }
                    span{

                    }
                }
            }
        }
        h3{
            margin: 24px 0 6px;
            color: $black;
            font-family: 'Oswald', sans-serif;
            font-size: 20px;
        }
    }
    @include media-breakpoint-down(xl) {
        .poster{
            width: 300px;
            height: 300px * 3 / 2;
            margin-right: 40px;
        }
    }
    @include media-breakpoint-down(lg) {
        display: block;
        .poster{
            margin-bottom: 40px;
        }
    }
    @include media-breakpoint-down(md) {
        .specs{
            .title{
                font-size: 50px;
            }
            .ratings{
                .rating-wrap{
                    display: block;
                    .rating{
                        margin-top: 10px;
                    }
                }
            }
        }
    }
}
</style>