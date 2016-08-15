<style lang=less>
  .hide{
    display: none
  }
</style>

<template>
  <div>
    <input class="hide image input" type="file" @change="previewImg" accept="image/*"/>
    <a id="avatar" @click="changeImg" href="javascript:void(0)" data-content="点击更换头像">
      <img :src="img_src" id="profile-image" class="ui centered image" />
    </a>
  </div>
</template>

<script>
  import $ from 'jquery'
  export default {
    props: {
      img_src: {
        type: String,
        default: '/static/avatar.svg'
      }

    },
    components: {
    },
    data: function () {
      return {
      }
    },
    ready () {
    },
    methods: {
      changeImg: function () {
        return $(this.$el).find('.hide.image.input').click()
      },
      previewImg: function (e) {
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
          return $('#profile-image-upload').attr('src', e.target.result)
        }
        reader.readAsDataURL(file)
        return this.uploadImage()
      }
    },
    computed: {
    }
  }
</script>
