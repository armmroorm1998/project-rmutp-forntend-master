<template>
  <div class="d-flex justify-content-right align-items-right m-3">
    <div  v-if="detailFood !== null">
      <div v-for="(detailFood, index) in detailFood" :key="index">
        <star-rating :increment="0.1" inactive-color="#ffcc99"  :star-size="35"  active-color="#ffff66" :border-width="1" :rating="detailFood.point "></star-rating>
      </div>
    </div>
    <div v-if="detailFood == null">
      <star-rating :increment="0.1" inactive-color="#ffcc99"  :star-size="35"  active-color="#ffff66" :border-width="1" :rating="rating"></star-rating>
    </div>
  </div>
</template>

<script>
import StarRating from 'vue-star-rating'
import { mapGetters } from 'vuex';
export default {
  data() {
    return {
      rating: 0
    }
  },

  computed: {
    ...mapGetters({ detailFood: 'food/detailFood' })
  },
  components: {
    StarRating
  }
}
</script>