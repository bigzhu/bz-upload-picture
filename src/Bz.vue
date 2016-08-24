<style lang=less>
  .hide{
    display: none
  }
</style>

<template>
  <div class="ui segment">
    <div v-show="loading" class="ui large active loader">
      <div class="ui text loader">上传图片中</div>
    </div>
    <!--
    <input class="hide image input" type="file" @change="previewImg" accept="image/*"/>
    -->
    <upload-file class="hide" :upload_url="upload_url" :change_call_back="previewImg" :done_call_back="done_call_back" accept="image/*"></upload-file>
    <a @click="changeImg" href="javascript:void(0)" data-content="点击更换头像">
      <img :src="img_src" class="ui medium centered image" />
    </a>
  </div>
</template>

<script>
  import upload_picture from './assets/upload-picture.svg'
  import UploadFile from 'bz-upload-file'
  import $ from 'jquery'
  export default {
    props: {
      call_back: {
        type: Function
      },
      upload_url: {
        type: String,
        default: '/api_file_upload'
      },
      img_src: {
        type: String,
        default: upload_picture
      }
    },
    components: {
      UploadFile
    },
    data: function () {
      return {
        loading: false,
        img_input: null,
        pre_img: null
      }
    },
    ready () {
      this.img_input = $(this.$el).find('input')
      this.pre_img = $(this.$el).find('img')
    },
    methods: {
      changeImg: function () {
        return this.img_input.click()
      },
      previewImg: function (e) {
        this.loading = true
        let _this = this
        var file, reader
        file = e.target.files[0]
        if (!file) {
          return
        }
        if (file.size > (10 * 1024 * 1024)) {
          throw new Error('图片大小只能小于10m哦~')
        }
        reader = new window.FileReader()
        reader.onload = function (e) {
          _this.pre_img.attr('src', e.target.result)
        }
        reader.readAsDataURL(file)
      },
      done_call_back: function (file_path) {
        this.pre_img.attr('src', file_path)
        this.loading = false
        if (this.call_back) {
          this.call_back(file_path)
        }
      }
    },
    computed: {
    }
  }
</script>
