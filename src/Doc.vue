<style lang=less>
</style>

<template>
  <div>
    <doc :name="name"
      :desc="desc"
      :parm_desc="parm_desc"
      :parms="parms"
      :code="code"
      >
      <bz :call_back="call_back"></bz>
    </doc>
  </div>
</template>

<script>
  import 'bz-semantic-ui-card'
  import 'bz-semantic-ui-grid'
  import Bz from './Bz'
  import Doc from 'bz-doc'
  export default {
    components: {
      Bz,
      Doc
    },
    route: {
      deactivate: function (transition) {
        this.$broadcast('unbind-scroll')
        transition.next()
      }
    },
    data: function () {
      return {
        datas: [1],
        name: 'bz-upload-picture',
        desc: '上传图片',
        parms: [
          {parm: 'upload_url', desc: "用哪个url来传，默认'/api_file_upload'"},
          {parm: 'call_back', desc: '完成上传后的回调函数, 上传后的图片地址做为入参'},
          {parm: 'img_src', desc: '传入默认显示的图片，一般用于编辑时(可选)'}
        ],
        parm_desc: ``,
        code: `<bz :call_back="call_back"></bz>`
      }
    },
    methods: {
      call_back: function (file_url) {
        window.alert(file_url)
      }
    }
  }
</script>
