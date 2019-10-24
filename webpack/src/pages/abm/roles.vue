<template>
<v-card>
    <v-toolbar
      card
      color="grey lighten-3"
    >
      <v-icon>mdi-silverware</v-icon>
      <v-toolbar-title>Administrar Usuarios</v-toolbar-title>
    </v-toolbar>

    <v-layout justify-space-between pa-3 >
      <v-flex xs5>
          <v-treeview
            :active.sync="active"
            :items="items"
            :load-children="fetchUsers"
            :open.sync="open"
            activatable
            active-class="primary--text"
            class="grey lighten-5"
            open-on-click
            transition
          >
            <v-icon
              v-if="!item.children"
              slot="prepend"
              slot-scope="{ item, active }"
              :color="active ? 'primary' : ''"
            >person</v-icon>
          </v-treeview>
        </v-flex>
        <v-flex
          d-flex
          text-xs-center
        >
          <v-scroll-y-transition mode="out-in">
            <div
              v-if="!selected"
              class="title grey--text text--lighten-1 font-weight-light"
              style="align-self: center;"
            >
              Selecciona un Usuario
            </div>
            <v-card
              v-else
              :key="selected.id"
              class="pt-4 mx-auto"
              flat
              max-width="400"
            >
              <v-card-text>
                <v-avatar
                  v-if="avatar"
                  size="20"
                >
                  <!-- <v-img
                    :src="`https://avataaars.io/${avatar}`"
                    class="mb-4"
                  ></v-img> -->
                  <v-icon
                  >person</v-icon>
                </v-avatar>
                <h3 class="headline mb-2">
                  {{ selected.username }}
                </h3>
                <div class="blue--text mb-2">{{ selected.email }}</div>
                <div class="blue--text subheading font-weight-bold">{{ selected.username }}</div>
              </v-card-text>
              <v-divider></v-divider>
              <v-layout
                tag="v-card-text"
                text-xs-left
                wrap
              >
                <v-flex tag="strong" xs2 text-xs-right mr-3 mb-2>Puesto:</v-flex>
                <v-flex xs9> {{ selected.puesto }}</v-flex>
                <v-flex tag="strong" xs2 text-xs-right mr-3 mb-2>Roles:</v-flex>
                <v-flex xs9>
                  <div v-for="rol in selected.roles" :key="rol.id">
                    <v-chip outline color="secondary">{{rol.name}}</v-chip>
                  </div>
                </v-flex>
                <v-flex tag="strong" xs2 text-xs-right mr-3 mb-2>Teléfono:</v-flex>
                <v-flex xs9>{{ selected.phone }}</v-flex>
                <v-flex xs12>
                  <v-btn small block color="indigo" dark>Editar Roles</v-btn>
                </v-flex>
            </v-layout>
          </v-card>
        </v-scroll-y-transition>
      </v-flex>
    </v-layout>

    <v-divider></v-divider>

    <v-card-actions>
      <v-btn
        flat
        @click="tree = []"
      >
        Reset
      </v-btn>

      <v-spacer></v-spacer>

      <v-btn
        class="white--text"
        color="green darken-1"
        depressed
      >
        Save
        <v-icon right>content-save</v-icon>
      </v-btn>
    </v-card-actions>
  </v-card>
    
</template>

<script>
    const avatars = [
    '?accessoriesType=Blank&avatarStyle=Circle&clotheColor=PastelGreen&clotheType=ShirtScoopNeck&eyeType=Wink&eyebrowType=UnibrowNatural&facialHairColor=Black&facialHairType=MoustacheMagnum&hairColor=Platinum&mouthType=Concerned&skinColor=Tanned&topType=Turban',
    '?accessoriesType=Sunglasses&avatarStyle=Circle&clotheColor=Gray02&clotheType=ShirtScoopNeck&eyeType=EyeRoll&eyebrowType=RaisedExcited&facialHairColor=Red&facialHairType=BeardMagestic&hairColor=Red&hatColor=White&mouthType=Twinkle&skinColor=DarkBrown&topType=LongHairBun',
    '?accessoriesType=Prescription02&avatarStyle=Circle&clotheColor=Black&clotheType=ShirtVNeck&eyeType=Surprised&eyebrowType=Angry&facialHairColor=Blonde&facialHairType=Blank&hairColor=Blonde&hatColor=PastelOrange&mouthType=Smile&skinColor=Black&topType=LongHairNotTooLong',
    '?accessoriesType=Round&avatarStyle=Circle&clotheColor=PastelOrange&clotheType=Overall&eyeType=Close&eyebrowType=AngryNatural&facialHairColor=Blonde&facialHairType=Blank&graphicType=Pizza&hairColor=Black&hatColor=PastelBlue&mouthType=Serious&skinColor=Light&topType=LongHairBigHair',
    '?accessoriesType=Kurt&avatarStyle=Circle&clotheColor=Gray01&clotheType=BlazerShirt&eyeType=Surprised&eyebrowType=Default&facialHairColor=Red&facialHairType=Blank&graphicType=Selena&hairColor=Red&hatColor=Blue02&mouthType=Twinkle&skinColor=Pale&topType=LongHairCurly'
  ]

  import axios from 'axios'

  export default {
    data: () => ({
      active: [],
      avatar: null,
      open: [],
      users: [],
      apigw: process.env.SIEP_API_GW_INGRESS,
    }),
    computed: {
      items () {
      return [
        {
          name: 'Usuarios',
          children: this.users
        }]
      },
      selected () {
        if (!this.active.length) return undefined

        const id = this.active[0]
        // console.log(user);

        return this.users.find(user => user.id === id)
      }
    },
    watch: {
      selected: 'randomAvatar'
    },
    methods: {
      async fetchUsers (item) {
        var vm = this;
        const curl = axios.create({
            baseURL: vm.apigw
          });

        return curl.get('/auth/acl/users')
          .then(res => {
            item.children.push(...res.data.data);
            item.children.map( child => {
              child.name = child.username
            })
            console.log(item.children);
          })
          // .then(json => (item.children.push(...json)))
          .catch(err => console.warn(err))
      },
      randomAvatar () {
        this.avatar = avatars[Math.floor(Math.random() * avatars.length)]
      }
    }
  }
</script>

<style scoped>

</style>
