(function($) {

  // 属性の監視を行う
  $.fn.observeAttribute = function (options) {
    options = $.extend({
      'attributes': null,         // 監視対象の属性リスト(文字列または配列) 指定しなければ全属性が対象
      'selector': null,           // 監視対象の要素セレクタ文字列(ルート要素からの相対指定) 指定しなければ自身のみ
      'callback': function(){}
    },options);

    this.each(function(){
        new ObsvAttr($(this), options);
    });
    return this;
  };

  class ObsvAttr {
    constructor ($target, options) {
      this.$target = $target;
      this.options = options;
      this.observerConfig = {
        attributes: true,
        childList: true,
        subtree: true,
        attributeOldValue: true
      };

      // MutationObseverを定義する
      // (同一要素への適用は一回のみ)
      if (!this.$target.data('attribute-observer')) {
        this.observer = new MutationObserver((mutations)=>{
          this.onMutated(mutations);
        });
        this.observer.observe($target[0], this.observerConfig);
        this.$target.data('attribute-observer', this.observer);
      }

      // 設定を要素に記録
      let our_options = this.$target.data('attribute-observer-options') 
                          ? this.$target.data('attribute-observer-options')
                          : [];
      our_options.push(this.options);
      this.$target.data('attribute-observer-options', our_options);
    }

    // 変化が起きたときの呼び出されるコールバック
    onMutated (mutations) {
      let our_options = this.$target.data('attribute-observer-options');
      mutations.forEach ((mutation)=>{
        // console.log(mutation);
        if (mutation.type!='attributes') return;

        our_options.forEach((options)=>{
          // console.log(options);
          let sel_matched = false;
          if (options.selector) {
            // セレクタの指定あり
            // セレクタ
            sel_matched = this.isMatched(mutation.target, options.selector);
          } else {
            // セレクタの指定なし
            if (mutation.target==this.$target[0]) {
              // 対象要素が、オブサーバーを適用した自身の要素の場合
              sel_matched = true;
            }
          }
          let attr_matched = true;
          if (options.attributes) {
            // 属性の指定あり
            attr_matched = false;
            let attrs = options.attributes;
            if (typeof attrs=='string') {
              attrs = [options.attributes];
            }
            attrs.some((attr)=>{
              if (attr==mutation.attributeName) {
                // 対象属性が指定属性に一致
                attr_matched = true;
                return true;
              }
            });
          }

          if (sel_matched && attr_matched && options.callback) {
            // 条件にマッチする

            // コールバック呼び出し
            options.callback({
              mutationRecord: mutation,                                   // MutationRecordオブジェクト
              target: mutation.target,                                    // 属性の変更があったノード
              attrName: mutation.attributeName,                           // 変更があった属性名
              oldValue: mutation.oldValue,                                // 変更前の属性値
              newValue: $(mutation.target).attr(mutation.attributeName)   // 変更後の属性値
            });
          }
        });
      });
    }

    // ノードがセレクタにマッチするか判定する
    isMatched (node, selector) {
      // console.log(selector);

      // いったん監視をストップ
      this.observer.disconnect();
      
      let matched = false;
      this.$target.find(selector).each(($idx,e)=>{
          if (e==node){
              matched = true;
              return false;
          }
      });
      // console.log('matched:'+matched);

      // 監視を再開
      this.observer.observe(this.$target[0], this.observerConfig);

      return matched;
    }
  }

  $.fn.observeNode = function (options) {
    options = $.extend({
      'selector': null,
      'callback': function(){}
    },options);

    this.each(function(){
        new ObsvNode($(this), options);
    });
    return this;
  };

  class ObsvNode {
    constructor ($target, options) {
      this.$target = $target;
      this.options = options;
      this.observerConfig = {
        attributes: false,
        childList: true,
        subtree: true
      };

      // MutationObseverを定義する
      // (同一要素への適用は一回のみ)
      if (!this.$target.data('node-observer')) {
        this.observer = new MutationObserver((mutations)=>{
          this.onMutated(mutations);
        });
        this.observer.observe($target[0], this.observerConfig);
        this.$target.data('node-observer', this.observer);
      }

      // 設定を要素に記録
      let our_options = this.$target.data('node-observer-options') 
                          ? this.$target.data('node-observer-options')
                          : [];
      our_options.push(this.options);
      this.$target.data('node-observer-options', our_options);
    }

    // 変化が起きたときの呼び出されるコールバック
    onMutated (mutations) {
      let our_options = this.$target.data('node-observer-options');
      mutations.forEach ((mutation)=>{
        // console.log(mutation);
        if (mutation.type!='childList') return;

        let mutated_node = null;
        let mode;
        if (mutation.addedNodes && mutation.addedNodes.length) {
          // 要素の追加
          mutated_node = mutation.addedNodes[0];
          mode = 'add';
        } else if (mutation.removedNodes && mutation.removedNodes.length) {
          // 要素の削除
          mutated_node = mutation.removedNodes[0];
          mode = 'remove';
        }

        // ノードの変更でなければスキップ
        if (!mutated_node || mutated_node.nodeType!=1) return;

        our_options.forEach((options)=>{
          let sel_matched = false;
          if (options.selector) {
            // セレクタの指定あり
            // セレクタに一致する要素か検証
            sel_matched = this.isMatched(
              mutated_node, 
              mode=='remove' ? mutation.target : null, 
              options.selector
            );
          } else {
            // セレクタの指定なし
            sel_matched = true;
          }

          if (sel_matched && options.callback) {
            // 条件にマッチする

            // コールバック呼び出し
            options.callback({
              mutationRecord: mutation,           // MutationRecordオブジェクト
              type: mode,                         // add or remove
              target: mutation.target,            // 変更があったノード（追加・削除されたノードの親ノード）
              node: mutated_node                  // 追加・削除ノード
            });
          }
        });
      });
    }

    // ノードがセレクタにマッチするか判定する
    // ノート削除の判定時は、すでにDOMから削除されているため
    // 仮にnodeをtarget_nodeに追加して検証する
    isMatched (node, target_node, selector) {
      // console.log(selector);

      // いったん監視をストップ
      this.observer.disconnect();

      if (target_node) {
        // 削除時の判定のため、いったんノードをtargetnodeに追加
        $(node).hide();
        $(target_node).append($(node));
      }
      
      let matched = false;
      this.$target.find(selector).each(($idx,e)=>{
          if (e==node){
              matched = true;
              return false;
          }
      });
      // console.log('matched:'+matched);

      if (target_node) {
        $(node).remove();
      }

      // 監視を再開
      this.observer.observe(this.$target[0], this.observerConfig);

      return matched;
    }
  }
})(jQuery);