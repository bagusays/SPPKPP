<script>

import VueCharts from 'vue-chartjs';
import { HorizontalBar } from 'vue-chartjs'

export default {
    extends: HorizontalBar,
    props: ['labels', 'data'],
    data() {
        return {
            color : ['#DEEBF7', '#C6DBEF', '#9ECAE1', '#6BAED6', '#4292C6', '#2171B5', '#08519C', '#08306B']
        }
    },
    mounted () {
        this.renderChart({
        labels: this.labels,
        datasets: [
            {
                label: 'Hasil Perhitungan',
                backgroundColor: this.color.map(res => res),
                data: this.data
            }]
        }, {responsive: true, maintainAspectRatio: false})
    }
}

</script>
