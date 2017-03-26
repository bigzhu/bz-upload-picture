<template>
  <div>
    <doc :name="name"
      :desc="desc"
      :parm_desc="parm_desc"
      :parms="parms"
      :code="code"
      >
      <bz v-model="img" alt="测试"></bz>
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
        img: '',
        datas: [1],
        name: 'bz-upload-picture',
        desc: '上传图片',
        parms: [
          {parm: 'bind:object', desc: 'src, alt'},
          {parm: 'event:upload_done(object)', desc: '完成上传后的事件'},
          {parm: 'upload_url', desc: "用哪个url来传，默认'/api_file_upload'(可选)"},
          {parm: 'alt', desc: 'img的alt(可选)'},
          {parm: 'blank_img', desc: '传入默认显示的图片，一般用于编辑时(可选)'}
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
