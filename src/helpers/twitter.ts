import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const Twitter = require('twitter');

@Injectable()
export class TwitterHelper {
  client: any;
  constructor(private readonly config: ConfigService) {
    this.client = new Twitter({
      consumer_key: this.config.get('TWITTER_CONSUMER_KEY'),
      consumer_secret: this.config.get('TWITTER_CONSUMER_SECRET'),
      access_token_key: this.config.get('TWITTER_ACCESS_TOKEN_KEY'),
      access_token_secret: this.config.get('TWITTER_ACCESS_TOKEN_SECRET'),
    });
  }

  async postImageTweet(
    post: any,
    servideURL: string,
    base64: string,
  ): Promise<any> {
    return new Promise((resolve, reject) => {
      // 画像の投稿
      this.client.post('media/upload', { media_data: base64 }, (err, media) => {
        if (err) reject(err);

        // コメントの長さ調節
        let comments = post.comments ? post.comments : '';
        let tweetComments = this.makeTweetComments(
          comments,
          post.pref_id,
          post.drink,
          post.author,
          post.snshandle,
          servideURL,
        );

        if (tweetComments.length > 135) {
          const upperLimit = tweetComments.length - 135;
          const commentLength = comments.length - upperLimit;
          comments = comments.slice(0, commentLength) + '...';

          tweetComments = this.makeTweetComments(
            comments,
            post.pref_id,
            post.drink,
            post.author,
            post.snshandle,
            servideURL,
          );
        }
        console.log('tweet length', tweetComments.length);

        const status = {
          status: tweetComments,
          media_ids: media.media_id_string,
        };

        // 画像付きのツイート
        this.client.post('statuses/update', status, (err, tweet) => {
          if (err) reject(err);
          resolve(tweet);
        });
      });
    });
  }

  private makeTweetComments(
    comments: string,
    pref_id: string,
    drink: string,
    author: string,
    snshandle: string,
    servideURL: string,
  ) {
    if (snshandle) {
      return `#${pref_id} ${drink}
${servideURL}

${comments}
by ${author} (@${snshandle})

#STARBUCKS #47JIMOTOフラペチーノ`;
    } else {
      return `#${pref_id} ${drink}
${servideURL}

${comments}
by ${author}

#STARBUCKS #47JIMOTOフラペチーノ`;
    }
  }
}
