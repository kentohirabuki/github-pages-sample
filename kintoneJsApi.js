
class KintoneJsApi {
  #isMobileDevice = kintone.app.getId() === null;
  #eventTypes = {
    indexShow: this.#isMobileDevice ? 'mobile.app.record.index.show' : 'app.record.index.show',
    indexEditShow: this.#isMobileDevice ? '' : 'app.record.index.edit.show',
    indexEditChange: this.#isMobileDevice ? '' : 'app.record.index.edit.change',
    indexEditSubmit: this.#isMobileDevice ? '' : 'app.record.index.edit.submit',
    indexEditSubmitSuccess: this.#isMobileDevice ? '' : 'app.record.index.edit.submit.success',
    indexDeleteSubmit: this.#isMobileDevice ? '' : 'app.record.index.delete.submit',
    detailShow: this.#isMobileDevice ? 'mobile.app.record.detail.show' : 'app.record.detail.show',
    detailDeleteSubmit: this.#isMobileDevice ? 'mobile.app.record.detail.delete.submit' : 'app.record.detail.delete.submit',
    detailProcessProceed: this.#isMobileDevice ? 'mobile.app.record.detail.process.proceed' : 'app.record.detail.process.proceed',
    createShow: this.#isMobileDevice ? 'mobile.app.record.create.show' : 'app.record.create.show',
    createChange: this.#isMobileDevice ? 'mobile.app.record.create.change' : 'app.record.create.change',
    createSubmit: this.#isMobileDevice ? 'mobile.app.record.create.submit' : 'app.record.create.submit',
    createSubmitSuccess: this.#isMobileDevice ? 'mobile.app.record.create.submit.success' : 'app.record.create.submit.success',
    editShow: this.#isMobileDevice ? 'mobile.app.record.edit.show' : 'app.record.edit.show',
    editChange: this.#isMobileDevice ? 'mobile.app.record.edit.change' : 'app.record.edit.change',
    editSubmit: this.#isMobileDevice ? 'mobile.app.record.edit.submit' : 'app.record.edit.submit',
    editSubmitSuccess: this.#isMobileDevice ? 'mobile.app.record.edit.submit.success' : 'app.record.edit.submit.success',
    printShow: this.#isMobileDevice ? '' : 'app.record.print.show',
    reportShow: this.#isMobileDevice ? 'mobile.app.report.show' : 'app.report.show',
    portalShow: this.#isMobileDevice ? 'mobile.portal.show' : 'portal.show',
    spacePortalShow: this.#isMobileDevice ? 'mobile.space.portal.show' : 'space.portal.show',
  }

  get isMobileDevice() {
    return this.#isMobileDevice;
  }

  get eventTypes() {
    return this.#eventTypes;
  }

  /* 対応しているイベントタイプを取得する
    * @param {Array} targetEventTypes イベントタイプの配列
    * @returns {Array} 対応しているイベントタイプの配列
    */
  getSupportedEventTypes = (targetEventTypes) => {
    return Object.keys(this.#eventTypes).filter(eventType => {
      return targetEventTypes.filter(Boolean).includes(this.#eventTypes[eventType]);
    }).map(eventType => {
      return this.#eventTypes[eventType];
    });
  }

  /** レコードIDを取得する
   * @returns {number} レコードID
   * @link https://cybozu.dev/ja/kintone/docs/js-api/record/get-record-id/
   */
  getRecordId = () => {
    return this.#isMobileDevice ? kintone.mobile.app.record.getId() : kintone.app.record.getId();
  };

  /** レコードの値を取得する
   * @returns {Object} レコードの値
   * @link https://cybozu.dev/ja/kintone/docs/js-api/record/get-record/
   */
  getRecord = () => {
    return this.#isMobileDevice ? kintone.mobile.app.record.get() : kintone.app.record.get();
  };

  /** レコードの値をセットする
   * @param {Object} record レコードの値
   * @returns {void} なし
   * @link https://cybozu.dev/ja/kintone/docs/js-api/record/set-record/
   */
  setRecord = (record) => {
    return this.#isMobileDevice ? kintone.mobile.app.record.set(record) : kintone.app.record.set(record);
  };

  /** アプリIDを取得する
   * @returns {number} アプリID
   * @link https://cybozu.dev/ja/kintone/docs/js-api/app/get-app-id/
   */
  getAppId = () => {
    return this.#isMobileDevice ? kintone.mobile.app.getId() : kintone.app.getId();
  };

  /** ルックアップフィールドの参照先のアプリIDを取得する
   * @param {string} fieldCode ルックアップフィールドのフィールドコード
   * @returns {number} ルックアップ参照先のアプリID
   * @link https://cybozu.dev/ja/kintone/docs/js-api/app/get-lookup-target/
   */
  getLookupTargetAppId = (fieldCode) => {
    return this.#isMobileDevice ? kintone.mobile.app.getLookupTargetAppId(fieldCode) : kintone.app.getLookupTargetAppId(fieldCode);
  };

  /** 関連レコード一覧の参照先のアプリIDを取得する
   * @param {string} fieldCode 関連レコード一覧フィールドのフィールドコード
   * @returns {number} 関連レコード一覧の参照先のアプリID
   * @link https://cybozu.dev/ja/kintone/docs/js-api/app/get-related-records-target/
   */
  getRelatedRecordsTargetAppId = (fieldCode) => {
    return this.#isMobileDevice ? kintone.mobile.app.getRelatedRecordsTargetAppId(fieldCode) : kintone.app.getRelatedRecordsTargetAppId(fieldCode);
  };

  /** レコード一覧のクエリ文字列を取得する
   * @returns {string} レコード一覧のクエリ文字列。レコード一覧画面で絞り込みをしていない場合は、空文字が返ります。
   * @link https://cybozu.dev/ja/kintone/docs/js-api/app/get-record-list-query/
   */
  getQueryCondition = () => {
    return this.#isMobileDevice ? kintone.mobile.app.getQueryCondition() : kintone.app.getQueryCondition();
  };

  /** レコード一覧のクエリ文字列を取得する（オプション付き）
   * @returns {string} 次のオプションを含む、絞り込み条件のクエリ文字列。
   *  - limit：表示件数
   *  - offset：表示開始位置
   *  - order by：表示順
   *
   *  絞り込み条件が設定されていない場合には、上記のオプションだけが返ります。
   *  並び順が設定されていない場合は、limit と offset だけが返ります。
   * @link https://cybozu.dev/ja/kintone/docs/js-api/app/get-record-list-query-with-order-by-limit-offset/
   */
  getQuery = () => {
    return this.#isMobileDevice ? kintone.mobile.app.getQuery() : kintone.app.getQuery();
  };

  /** フィールドの表示／非表示を切り替える
   * @param {string} fieldCode フィールドのフィールドコード
   * テーブル内の特定のフィールドを非表示にする場合は、非表示にするフィールドのフィールドコードを指定します。
   * テーブル内のすべてのフィールドを非表示にする場合は、テーブルのフィールドコードを指定します。
   * 存在しないフィールドコードを指定した場合は、エラーにならず、何も起こりません。
   * @param {boolean} isShown フィールドを表示するかどうか
   * - true: フィールドを表示する
   * - false: フィールドを非表示にする
   * @returns {void} 
   * @link https://cybozu.dev/ja/kintone/docs/js-api/record/show-or-hide-a-field/
   */
  setFieldShown = (fieldCode, isShown) => {
    return this.#isMobileDevice ? kintone.mobile.app.record.setFieldShown(fieldCode, isShown) : kintone.app.record.setFieldShown(fieldCode, isShown);
  };

  /** グループフィールドを開閉する
   * @param {string} fieldCode グループフィールドのフィールドコード
   * @param {boolean} isOpen グループフィールドを開くかどうか
   * - true: グループフィールドを開いて表示する
   * - false: グループフィールドを閉じて表示する
   * @returns {void}
   * @link https://cybozu.dev/ja/kintone/docs/js-api/record/open-field-group/
   */
  setGroupFieldOpen = (fieldCode, isOpen) => {
    return this.#isMobileDevice ? kintone.mobile.app.record.setGroupFieldOpen(fieldCode, isOpen) : kintone.app.record.setGroupFieldOpen(fieldCode, isOpen);
  };

  /** レコード詳細画面でフィールドの要素を取得する
   * @param {string} fieldCode 取得するフィールドのフィールドコード
   * @returns {Element} フィールド要素
   * @link https://cybozu.dev/ja/kintone/docs/js-api/record/get-record-field-element/
   */
  getFieldElementOnDetail = (fieldCode) => {
    return this.#isMobileDevice ? kintone.mobile.app.record.getFieldElement(fieldCode) : kintone.app.record.getFieldElement(fieldCode);
  };

  /** レコード詳細画面でメニューの上側の要素を取得する
   * @returns {Element} メニューの上側の要素
   * @link https://cybozu.dev/ja/kintone/docs/js-api/record/get-record-header-menu-element/
   */
  getHeaderMenuSpaceElementOnDetail = () => {
    return this.#isMobileDevice ? null : kintone.app.record.getHeaderMenuSpaceElement();
  };

  /** レコード詳細画面でヘッダーの下側の要素を取得する
   * @return {Element} ヘッダーとコンテンツの間の要素
   * @link https://cybozu.dev/ja/kintone/docs/js-api/app/get-mobile-header-element/
   */
  getHeaderSpaceElementOnDetail = () => {
    return this.#isMobileDevice ? kintone.mobile.app.getHeaderSpaceElement() : null;
  };

  /** レコード詳細画面でスペースフィールドの要素を取得する
   * @param {string} id スペースフィールドの要素ID
   * @return {Element} スペースフィールドの要素
   * @link https://cybozu.dev/ja/kintone/docs/js-api/record/get-space-element/
   */
  getSpaceElementOnDetail = (id) => {
    return this.#isMobileDevice ? kintone.mobile.app.record.getHeaderSpaceElement(id) : kintone.app.record.getSpaceElement(id);
  };

  /** レコード一覧画面でフィールドの要素を取得する
   * @param {string} fieldCode 取得するフィールドのフィールドコード
   * @returns {Array} 配列（Element オブジェクト）フィールド要素の一覧 
   * レコードが 1 件もない場合は、空配列が返ります。
   * @link https://cybozu.dev/ja/kintone/docs/js-api/app/get-record-list-field-elements/
   */
  getFieldElementsOnIndex = (fieldCode) => {
    return this.#isMobileDevice ? kintone.mobile.app.getFieldElements(fieldCode) : kintone.app.getFieldElements(fieldCode);
  };

  /** レコード一覧画面でメニューの右側の要素を取得する
   * @returns {Element} 集計アイコンの右側の要素
   * @link https://cybozu.dev/ja/kintone/docs/js-api/app/get-record-list-header-menu-element/
   */
  getHeaderMenuSpaceElementOnIndex = () => {
    return this.#isMobileDevice ? null : kintone.app.getHeaderMenuSpaceElement();
  };

  /** レコード一覧画面でメニューの下側の要素を取得する（モバイルの場合は、ヘッダーの下側の要素を取得する）
   * @returns {Element} レコードの絞り込みやレコードの追加などを操作するメニューと、レコード一覧との間の要素(モバイルの場合は、ヘッダーとコンテンツの間の要素)
   * @link https://cybozu.dev/ja/kintone/docs/js-api/app/get-record-list-header-element/
   * @link https://cybozu.dev/ja/kintone/docs/js-api/app/get-mobile-header-element/
   */
  getHeaderSpaceElementOnIndex = () => {
    return this.#isMobileDevice ? kintone.mobile.app.getHeaderSpaceElement() : kintone.app.getHeaderSpaceElement();
  };

  /** ポータルの上側の要素を取得する
   * @returns {Element} ポータルの上側の要素
   * @link https://cybozu.dev/ja/kintone/docs/js-api/portal/get-content-portal-element/
   */
  getContentSpaceElementOnPortal = () => {
    return this.#isMobileDevice ? kintone.mobile.portal.getContentSpaceElement() : kintone.portal.getContentSpaceElement();
  };

  /** スペースのトップ画面の上側の要素を取得する
   * @returns {Element} スペースのトップ画面の上側の要素
   * スペースの表示イベント以外で実行した場合、エラーにはならず、「null」 または要素が返ります。
   * @link https://cybozu.dev/ja/kintone/docs/js-api/space/get-content-space-element/
   */
  getContentSpaceElementOnSpace = () => {
    return this.#isMobileDevice ? kintone.mobile.space.portal.getContentSpaceElement() : kintone.space.portal.getContentSpaceElement();
  };
}
// export default new KintoneJsApi();