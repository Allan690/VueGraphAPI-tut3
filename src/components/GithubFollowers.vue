<template>
    <el-container class="cardContainer">
        <div>
<!--            <input v-model="userName" placeholder="Enter the username of the github user...">-->
            <button v-on:click="fetchFollowers">Submit</button>
            <div class="option" v-for="(option, index) in buttonOptions" v-bind:key="index">
                <button class="option2" @click="filterUsers(option)">{{ option }}</button>
            </div>
        </div>
        <el-container style="display: inline-flex; flex-wrap: wrap">
            <div class="card" v-for="follower in followersArray" v-bind:key="follower.id">
                <img :src="follower.node.avatarUrl" alt="Avatar" style="width:100%">
                <div class="container">
                    <h4><b>{{ follower.node.name  }}</b></h4>
                    <p>{{follower.node.url | lowerCaseName }}</p>
                </div>
            </div>
        </el-container>
    </el-container>
</template>
<script>
    import axiosConfig from "@/axiosConfig";
    import axiosHelper from "@/axiosHelper";

    export default {
        name: 'GithubFollowersComponent',
        data() {
            return {
                userName: '',
                followersArray: [],
                buttonOptions: ['Onesmas Bosire', 'Newton Munene', 'Dennis Nderitu']
            }
        },
        props: {
            usersName: String
        },
        methods: {
            async fetchFollowers() {
                const results = await axiosConfig.request(axiosHelper(`
                        query { user(login: ${this.userName}){
                        followers(first: 10) {
                          edges {
                              node {
                                   name
                                   avatarUrl
                                   url
                             }
                           }
                      }
                  }
                 }
                        `));

                const { data: { data: { user: { followers: { edges }}}} } = results;
                this.followersArray = edges;
                return this.followersArray;
            },
            async filterUsers(filterTerm) {
                await this.fetchFollowers();
                this.followersArray = this.followersArray.filter(item => {
                    return item.node.name === filterTerm;
                });
                this.$emit('user-filter', filterTerm);
            }
        },
        filters: {
            lowerCaseName(name) {
                return name.toUpperCase()
            }
        },
        async mounted() {
            this.userName = this.usersName;
          await this.fetchFollowers()
        }
        // watch: {
        //     usersName(value) {
        //         console.log(value);
        //     }
        // }
    }
</script>

<style>
    .cardContainer {
        display: flex;
        flex-flow: wrap;
        justify-content: space-between;
    }
    input {
        margin-right: 20px;
        margin-left: 300px;
        width: 250px;
        border-style: none;
        outline: none;
    }
    button {
        padding: 10px 15px 10px 10px;
        border-radius: 25px;
        outline: none;
    }
    .card {
        box-shadow: 0 4px 8px 0 rgba(0,0,0,0.2);
        transition: 0.3s;
        width: 40%;
        border-radius: 5px;
        margin: 50px;
    }

    .card:hover {
        box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2);
    }

    img {
        border-radius: 5px 5px 0 0;
    }

    .container {
        padding: 2px 16px;
    }
    .option {
        display: inline;
    }
    .option2 {
        margin: 20px
    }
</style>
