<template>
  <div>
    <doc :name="name"
      :desc="desc"
      :parm_desc="parm_desc"
      :parms="parms"
      :code="code"
      >
      <bz @upload_done="call_back"></bz>
      <bz :change_img="false" @upload_done="call_back"></bz>
    </doc>
  </div>
</template>

<script>
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
          {parm: 'event:upload_done', desc: '完成上传后的事件, 上传后的图片地址做为参数'},
          {parm: 'upload_url', desc: "用哪个url来传，默认'/api_file_upload'(可选)"},
          {parm: 'img_src', desc: '传入默认显示的图片，一般用于编辑时(可选)'}
        ],
        parm_desc: ``,
        code: `<bz @upload_done="call_back"></bz>`
      }
    },
    methods: {
      call_back: function (file_url) {
        window.alert(file_url)
      }
    }
  }
</script>
