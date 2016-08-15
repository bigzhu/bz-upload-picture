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
          {parm: 'img_src', desc: "还没传时显示的默认图片(可选), 默认 '/static/logo.svg'"},
          {parm: 'upload_url', desc: "用哪个url来传，默认'/api_file_upload'"},
          {parm: 'call_back', desc: '完成上传后的回调函数, 上传后的图片地址做为入参'}
        ],
        parm_desc: ``,
        code: `<bz></bz>`
      }
    },
    methods: {
      call_back: function (file_url) {
        window.alert(file_url)
      }
    }
  }
</script>
