<template>
  <div>

    <v-chip
      class="ml-0"
      label
      small
    >
      Secciones: {{ response.total || 'Sin resultados' }}
    </v-chip>

    <!-- Descargar excel -->
    <v-btn
      v-if="response.total"
      small
      :loading="excel.download"
      :disabled="excel.download"
      @click.native="startDownload"

      color="green"
      class="white--text"
    >
      <span style="font-size: 18px; margin-right:15px;">
        <font-awesome-icon :icon="['fas','file-excel']"/>
      </span>
      Descargar Excel
    </v-btn>

    <v-snackbar
      v-model="excel.snackbar"
      color="red darken-4"
    >
      Error: {{ excel.error_message }}
      <v-btn
        dark
        flat
        @click="excel.snackbar = false"
      >
        Cerrar
      </v-btn>
    </v-snackbar>
    <!-- ./Descargar excel -->

    <!-- Descargar PDF -->
    <v-btn
      v-if="response.total"
      small
      :loading="pdf.download"
      :disabled="pdf.download"
      @click.native="startDownloadPDF"
      red darken-1
      color="red darken-1"
      class="white--text"
    >
    <span style="font-size: 18px; margin-right:15px;">
      <font-awesome-icon :icon="['fas','file-pdf']"/>
    </span>
      Descargar PDF
    </v-btn>
    <!-- /Descargar PDF -->

    <!-- Datatable -->
    <v-data-table
      :headers="headers"
      :items="response.data"
      :loading="loading"
      no-data-text="No hay datos"
      hide-actions
      class="elevation-1"
    >
      <template slot="items" slot-scope="props">
        <td>{{ props.item.ciudad }}</td>
        <td class="text-xs-right">{{ props.item.cue }}</td>
        <td class="text-xs-right">{{ props.item.nombre }}</td>
        <td class="text-xs-right">{{ props.item.nivel_servicio }}</td>
        <td class="text-xs-right">{{ props.item.sector }}</td>
        <td class="text-xs-right">{{ props.item.anio }}</td>
        <td class="text-xs-right">{{ props.item.division }}</td>
        <td class="text-xs-right">{{ props.item.turno }}</td>
        <td class="text-xs-right">{{ props.item.hs_catedras }}</td>
        <td class="text-xs-right">{{ props.item.titulacion.reso_titulacion_nro }}/{{ props.item.titulacion.reso_titulacion_anio }}</td>
        <td class="text-xs-right">{{ props.item.reso_presupuestaria }}</td>
        <td class="text-xs-right">{{ props.item.titulacion.nombre_abreviado }}</td>
        <td class="text-xs-right">{{ props.item.titulacion.orientacion }}</td>
        <td class="text-xs-right">{{ props.item.tipo }}</td>
        <td class="text-xs-right">{{ props.item.plazas }}</td>
        <td class="text-xs-right">{{ props.item.matriculas }}</td>
        <td class="text-xs-right">{{ props.item.vacantes }}</td>
        <td class="text-xs-right">{{ props.item.observaciones }}</td>
      </template>
    </v-data-table>
    <!-- ./Datatable -->
    <br>

    <!-- Pagination -->
    <p class="text-xs-center">
      <v-pagination
        v-model="page"
        :length="response.last_page"
        :total-visible="7"
      />
    </p>
    <!-- ./Pagination -->

  </div>
</template>

<script>
  import axios from 'axios'

  export default {
    props: ['query'],
    data () {
      return {
        headers: [
          { text: 'Ciudad', value: 'ciudad', sortable: false  },
          { text: 'Cue', value: 'cue', sortable: false  },
          { text: 'Centro', value: 'nombre', sortable: false  },
          { text: 'Nivel de servicio', value: 'nivel_servicio' , sortable: false },
          { text: 'Sector', value: 'sector', sortable: false  },
          { text: 'Año', value: 'anio', sortable: false  },
          { text: 'Division', value: 'division', sortable: false  },
          { text: 'Turno', value: 'turno', sortable: false  },
          { text: 'Hs Cátedras', value: 'hs_catedras', sortable: false  },
          { text: 'Res. Pedagógica', value: 'res_pedagogica', sortable: false  },
          { text: 'Instr. legal de Creación', value: 'reso_presupuestaria', sortable: false  },
          { text: 'Titulación', value: 'titulacion', sortable: false  },
          { text: 'Orientación', value: 'titulacion.orientacion', sortable: false  },
          { text: 'Tipo', value: 'tipo', sortable: false  },
          { text: 'Plazas', value: 'plazas', sortable: false  },
          { text: 'Matriculas', value: 'matriculas', sortable: false  },
          { text: 'Vacantes', value: 'vacantes', sortable: false  },
          { text: 'Observaciones', value: 'observaciones', sortable: false  },
        ],
        response: [],

        excel: {
          download: false,
          error: false,
          error_message: false,
          snackbar: false
        },
        pdf: {
          download: false,
          error: false,
          error_message: false,
          snackbar: false
        },

        apigw: process.env.SIEP_API_GW_INGRESS,
        page: 1,
        loading: true,
        error: false,
        error_message: ''
      }
    },
    created: function () {
      this.getData();
    },
    watch: {
      page: function() {
        this.query.page = this.page;
        this.getData();
      },
      query: {
        handler() {
          // Cada vez que cambia la query, retorno a la primer pagina
          this.page = 1;
          this.getData();
        },
        deep: true
      }
    },
    methods: {
      getData() {
        let vm = this;
        vm.loading = true;
        vm.error = false;

        vm.scrollToTop();

        axios.get(vm.apigw+'/api/public/siep_admin/v1/matriculas/v1/matriculas_por_seccion',{
          params: vm.query
        })
        .then(function (response) {
          vm.response = response.data;
          vm.loading = false;
        })
        .catch(function (error) {
          vm.error = true;
          vm.error_message = error.message;
          vm.loading = false;
        });
      },
      startDownload() {
        let vm = this;
        vm.excel.download = true;
        vm.excel.error= false;

        let download= JSON.parse(JSON.stringify(vm.query));
        download.export = 1;
        download.por_pagina = 'all';

        axios.get(vm.apigw+'/api/public/siep_admin/v1/matriculas/v1/matriculas_por_seccion',{
          params: download,
          responseType: 'blob'
        })
        .then(function (response) {
          vm.excel.download= false;
          vm.excel.error= false;

          // Descarga EXCEL con AJAX (permite crear loading)
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'Matriculas_cuantitativas_por_seccion.xls');
          document.body.appendChild(link);
          link.click();
        })
        .catch(function (error) {
          vm.excel.download= false;
          vm.excel.error= true;
          vm.excel.error_message= error.message;
          vm.excel.snackbar = true;
        });
      },
      startDownloadPDF() {
        let vm = this;
        vm.pdf.download = true;
        vm.pdf.error= false;


        let download= JSON.parse(JSON.stringify(vm.query));
        download.export = 2;
        download.por_pagina = 'all';

        axios.get(vm.apigw+'/api/public/siep_admin/v1/matriculas/v1/matriculas_por_seccion',{
          params: download,
          responseType: 'blob'

        }).then(function (response) {
          vm.pdf.download= false;
          vm.pdf.error= false;

          // Descarga EXCEL con AJAX (permite crear loading)
          const url = window.URL.createObjectURL(new Blob([response.data]));
          const link = document.createElement('a');
          link.href = url;
          link.setAttribute('download', 'ddjj__secciones.pdf');
          document.body.appendChild(link);
          link.click();
        })
        .catch(function (error) {
          vm.pdf.download= false;
          vm.pdf.error= true;
          vm.pdf.error_message= error.message;
          vm.pdf.snackbar = true;
        });
      },
      scrollToTop() {
        window.scrollTo(0,0);
      }
    }
  }
</script>
