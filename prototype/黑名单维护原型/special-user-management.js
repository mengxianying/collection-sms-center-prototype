(() => {
  const originalOpenAdd = window.openAdd;
  const originalManage = window.manageCustomerBlacklist;
  const originalRenderCases = window.renderCases;

  function refreshManageLabels(root = document) {
    root.querySelectorAll('[data-case-manage]').forEach(button => {
      button.textContent = '特殊用户管理';
    });
  }

  function configureStopCollection() {
    const typeInputs = [...document.querySelectorAll('input[name=type]')];
    const phoneInputs = [...document.querySelectorAll('input[name=phone]')];
    const stopInput = document.querySelector('#stop-collection');
    if (!stopInput) return;

    const syncStopCollection = () => {
      const enabled = stopInput.checked;
      typeInputs.forEach(input => {
        if (enabled) input.checked = true;
        input.disabled = enabled;
      });
      phoneInputs.forEach(input => {
        if (enabled) input.checked = true;
        input.disabled = enabled;
      });
      document.querySelector('#sms-config').hidden = !typeInputs.some(input => input.value === 'sms' && input.checked);
      document.querySelector('#call-config').hidden = !typeInputs.some(input => input.value === 'call' && input.checked);
    };

    stopInput.addEventListener('change', syncStopCollection);
  }

  window.openAdd = function openSpecialUserAdd(cid, prephone = '', source = '案件列表') {
    originalOpenAdd(cid, prephone, source);
    document.querySelector('#modal-title').textContent = '加入特殊用户';
    const typeRow = document.querySelector('#modal-body .formrow');
    typeRow.insertAdjacentHTML('beforebegin', `
      <div class="formrow stop-collection-row">
        <div class="formlabel">停催</div>
        <div>
          <label class="stop-collection-option"><input id="stop-collection" type="checkbox">设置停催</label>
          <div class="helper">勾选后自动加入短信黑名单和自动外呼黑名单，并选中当前案件全部手机号。</div>
        </div>
      </div>`);
    configureStopCollection();
  };

  window.manageCustomerBlacklist = function manageSpecialUser(cid) {
    originalManage(cid);
    document.querySelector('#modal-title').textContent = '特殊用户管理';
    const addButton = document.querySelector('#manager-add');
    if (addButton) addButton.textContent = '＋ 加入特殊用户';
    document.querySelectorAll('#modal-body .empty').forEach(element => {
      element.textContent = element.textContent.replace('加入黑名单', '加入特殊用户');
    });
  };

  window.renderCases = function renderSpecialUserCases() {
    originalRenderCases();
    refreshManageLabels();
    const description = document.querySelector('.page-heading p');
    if (description) description.textContent = '通过“特殊用户管理”统一处理当前客户的黑名单与停催设置';
    const notice = document.querySelector('#content .panel > .notice');
    if (notice) notice.lastChild.textContent = '仅从案件列表发起特殊用户设置，客户由当前案件自动带入；可单独配置短信黑名单、自动外呼黑名单，或使用停催一键同时限制全部号码。';
  };

  refreshManageLabels();
})();
