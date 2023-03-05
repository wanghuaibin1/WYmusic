<template>
    <!-- 歌单详情页 -->
  <div class="songSheet">
    <div calss="">

    </div>
  </div>
</template>

<script>
import { datailAPI } from '@/api'
export default {
  name: 'Item-muusic',
  data () {
    return {
      Singing: []
    }
  },
  methods: {
    async dataolApi () {
      const { data: res } = await datailAPI({ id: this.$route.query.id })
      this.Singing = res
    }
  },
  components: {},
  props: {},
  watch: {},
  computed: {},
  created () {
    this.dataolApi()
  },
  mounted () {}
}
</script>
<style lang="less" scoped>
</style>
