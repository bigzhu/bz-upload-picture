<template>
  <div class="ui segment upload-img">
    <div v-show="loading" class="ui large active loader">
      <div class="ui text loader">上传图片中</div>
    </div>
    <upload-file :upload_url="upload_url" @change_file="previewImg" accept="image/*" @upload_done="done_call_back" class="hide">上传附件</upload-file>
    <a @click="changeImg" href="javascript:void(0)" data-content="" >
      <div class="upload position">
        <img :src="value||blank_img||default_picture" class="ui medium image" :alt="alt" />
      </div>
    </a>

    <a @click="deleteImg" :class="{'show-delete': value}" class="delete" href="javascript:;"><img src="./assets/delete.svg"></a>
  </div>
</template>

<script>
  import upload_picture from './assets/upload-picture.svg'
  import UploadFile from 'bz-upload-file'
  import $ from 'jquery'
  export default {
    props: {
      upload_url: {
        type: String,
        default: '/api_file_upload'
      },
      value: {
        type: String,
        default: ''
      },
      alt: {
        type: String,
        default: ''
      },
      blank_img: {
        type: String,
        default: ''
      }
    },
    components: {
      UploadFile
    },
    data: function () {
      return {
        default_picture: upload_picture,
        loading: false,
        img_input: null,
        pre_img: null
      }
    },
    mounted: function () {
      this.$nextTick(function () {
        this.img_input = $(this.$el).find('input')
        this.pre_img = $(this.$el).find('.image')
      })
    },
    methods: {
      deleteImg: function () {
        this.$emit('input', '')
      },
      changeImg: function () {
        return this.img_input.click()
      },
      previewImg: function (e) {
        this.loading = true
        // let self = this
        // var file, reader
        // file = e.target.files[0]
        // if (!file) {
        //   this.loading = false
        //   return
        // }
        // if (file.size > (10 * 1024 * 1024)) {
        //   throw new Error('图片大小只能小于10m哦~')
        // }
        // reader = new window.FileReader()
        // reader.onload = function (e) {
        //   self.pre_img.attr('src', e.target.result)
        // }
        // reader.readAsDataURL(file)
      },
      done_call_back: function (src, alt) {
        this.loading = false
        this.$emit('input', src)
        this.$emit('upload_done', src, alt)
      }
    },
    computed: {
    }
  }
</script>

<style>
  .hide {
    display: none!important;
  }

  .upload-img:hover .show-delete {
    visibility: visible;
    opacity: 1;
  }
  .delete {
    position: absolute;
    top: -0.5rem;
    right: -0.5rem;
    transition: color 0.3s ease;
    transition: visibility 0s, opacity 0.3s linear;
    opacity: 0;
  }
  .position {
    position: relative;
  }
  .upload {
    margin-left: 40%;
    margin-right: 40%;
    width: 20%;
    display: inline-block;
  }
</style>
