<template>
  <div class="detail">
    <section class="article">
      <div class="article__title">
         {{article.title}}
      </div>
      <div class="article__content">
        {{article.content}}
      </div>
      <p class="article__date">
        created_at({{article.created_at}})
      </p>
    </section>
    <section class="reply" >
      <p class="reply__header">답변 <span class="reply__num">2</span></p>
      <div class="comment" v-for="(comment, idx) in reply" :key="idx">
        <div class="comment__user-name">
          {{comment.user.name}}
        </div>
        <div class="comment__content">
          {{comment.contents}}
        </div>
        <p class="comment__date">created_at({{comment.created_at | dateFilter}})</p>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  computed: {
    param() {
      const itemId = this.$route.params
      return parseInt(itemId[`id`])
    },
    article() {
      return this.$store.getters.get_detail
    },
    reply() {
      return this.$store.getters.get_reply
    }

  },
  filters: {
    dateFilter(value) {
      value = value.substring(0, 10)
      return value
    }
  },
  mounted() {
    this.$store.dispatch("GET_DETAIL", this.param)
  },
  destroyed() {
    this.$store.dispatch("OUT_DETAIL")
  },
}
</script>

<style lang="scss">
@mixin cardLayout($color)  {
  border: 2px solid $color;
  border-radius: 5px;
  padding: 1em; 
}
@mixin mobileCardLayout($color) {
  border-top: 2px solid $color !important;
  border-right: none !important;
  border-bottom: 2px solid $color !important;
  border-left: none !important;
  border-radius: 0 !important;
}

@mixin date() {
  font-size: 14px;
  margin-bottom: 0;
  color: $grey;
}

$radius: 5px;
$grey : lightslategrey;
$green: #2DB400;

  .detail {
    width: 82vw;
    margin: 50px auto 0 auto;
    .article {
      @include cardLayout($green);

      &__title {
        font-weight: 700;
        font-size: 23px;
        margin-bottom: 10px;
        line-height: 1.4em;
      }
      &__content {
        line-height: 1.7em;
        margin-bottom: 10px;
        font-size: 15px;
      }
      &__date {
        @include date();
      }
    }
    .reply {
      margin-top: 40px;
      &__num {
        color:$green;
      }
      .comment{
        @include cardLayout($grey);
        margin-bottom: 1em;
        &__user-name {
          padding-bottom: 1em;
          border-bottom: 2px solid $grey;
        }
        &__content {
          margin-top: 17px;
        }
        &__date {
          @include date();
        }
      }
    }
  }
  @media screen and (max-width: 768px) {
    .detail {
      width: 100%;
      .article {
        @include mobileCardLayout($green);
      }
      .comment__user-name {
        padding-top: 1em;
      }
      .comment {
        @include mobileCardLayout($grey);
      }
    }
  }
</style>
