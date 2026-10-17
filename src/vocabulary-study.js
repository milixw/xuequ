(function(root){
  'use strict';
  const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function classify(verb){
    const groups=[];
    for(let i=0;i<Math.max(verb.past.length,verb.participle.length);i++){
      const a=verb.base,b=verb.past[i]||verb.past[0],c=verb.participle[i]||verb.participle[0];
      const name=a===b&&b===c?'AAA':a===b?'AAB':a===c?'ABA':b===c?'ABB':'ABC';
      if(!groups.includes(name))groups.push(name);
    }
    return groups;
  }
  function searchText(record){
    return [record.title,record.name,record.base,record.note,record.pitfall,
      ...(record.past||[]),...(record.participle||[]),...(record.formulas||[]),
      ...(record.rows||[]).flatMap(r=>[r.word,r.rule,r.example.en,r.example.zh]),
      ...(record.exercise?[record.exercise.sentence,record.exercise.instruction]:[])].filter(Boolean).join(' ').toLowerCase();
  }
  function confusableHTML(item){
    return '<article class="gs-card" id="'+esc(item.id)+'"><h2>'+item.no+'. '+esc(item.title)+'</h2>'+item.rows.map(r=>
      '<section class="gs-term"><h3>'+esc(r.word)+'</h3><p>'+esc(r.rule)+'</p><p class="gs-example">'+esc(r.example.en)+'<br><span>'+esc(r.example.zh)+'</span></p></section>').join('')+
      '<p class="gs-tip"><b>易错提醒：</b>'+esc(item.pitfall)+'</p><p class="gs-source">范围参考手册PDF第'+item.pages.map(esc).join('、')+'页；讲解与例句原创 · 待审核</p></article>';
  }
  function patternHTML(item){
    return '<article class="gs-card" id="'+esc(item.id)+'"><h2>'+item.no+'. '+esc(item.title)+'</h2>'+item.formulas.map(f=>'<p class="gs-formula">'+esc(f)+'</p>').join('')+
      '<p>'+esc(item.note)+'</p><div class="gs-example"><b>原创示例：</b><p>'+esc(item.example.from)+'<br>→ '+esc(item.example.to)+'<br>'+esc(item.example.translation)+'</p></div>'+
      '<label for="answer-'+esc(item.id)+'"><b>自己试一试：</b> '+esc(item.exercise.sentence)+'</label><p>'+esc(item.exercise.instruction)+'</p>'+
      '<textarea id="answer-'+esc(item.id)+'" rows="3" placeholder="写出改写或判断理由；练习只供自查，不自动判分"></textarea>'+
      '<details class="gs-answer"><summary>查看参考答案与检查要点</summary><p>'+esc(item.exercise.answer)+'</p><p>'+esc(item.exercise.explain)+'</p><p>其他合理表达请由老师核对，不要求逐字一致。</p></details>'+
      '<p class="gs-source">范围参考手册PDF第'+item.pages.map(esc).join('、')+'页；示例、练习与分析原创 · 待审核</p></article>';
  }
  function verbHTML(item){return '<tr id="'+esc(item.id)+'"><th scope="row">'+esc(item.base)+'</th><td>'+item.past.map(esc).join(' / ')+'</td><td>'+item.participle.map(esc).join(' / ')+'</td><td>'+classify(item).join(' / ')+'</td><td>'+esc(item.note||'—')+'</td></tr>';}
  function boot(){
    const data=root.GreenVocabularyStudyData;
    const host=document.getElementById('green-study');
    if(!host)return;
    if(!data){host.textContent='学习资料暂时无法加载，请刷新重试。';return;}
    const search=document.getElementById('gs-search'),type=document.getElementById('gs-type');
    document.getElementById('gs-confusables').innerHTML=data.confusables.map(confusableHTML).join('');
    document.getElementById('gs-patterns').innerHTML=data.patterns.map(patternHTML).join('');
    document.getElementById('gs-verbs').innerHTML=data.verbs.map(verbHTML).join('');
    document.getElementById('gs-modals').innerHTML=data.modals.map(item=>'<tr><th scope="row">'+esc(item.base)+'</th><td>'+esc(item.related)+'</td><td>'+esc(item.note)+'</td></tr>').join('');
    let tab='confusables';
    function filter(){
      const query=search.value.trim().toLowerCase();
      for(const [kind,list] of [['confusables',data.confusables],['patterns',data.patterns],['verbs',data.verbs]]){
        let count=0;
        for(const item of list){
          const pass=(!query||searchText(item).includes(query))&&(kind!=='verbs'||type.value==='all'||classify(item).includes(type.value));
          document.getElementById(item.id).hidden=!pass;if(pass)count++;
        }
        document.getElementById('gs-count-'+kind).textContent='当前显示 '+count+' / '+list.length+(kind==='verbs'?' 个动词':' 组');
      }
    }
    function select(){
      const hash=location.hash.slice(1);tab=['confusables','patterns','verbs'].includes(hash)?hash:'confusables';
      document.querySelectorAll('[data-gs-tab]').forEach(button=>button.setAttribute('aria-selected',String(button.dataset.gsTab===tab)));
      document.querySelectorAll('[data-gs-pane]').forEach(pane=>{pane.hidden=pane.dataset.gsPane!==tab;});
      document.getElementById('gs-type-label').hidden=tab!=='verbs';filter();
    }
    document.querySelectorAll('[data-gs-tab]').forEach(button=>button.addEventListener('click',()=>{location.hash=button.dataset.gsTab;}));
    search.addEventListener('input',filter);type.addEventListener('change',filter);
    window.addEventListener('hashchange',select);select();
  }
  const api={classify,searchText,confusableHTML,patternHTML,verbHTML};
  if(typeof module!=='undefined'&&module.exports)module.exports=api;
  else {root.VocabularyStudy=api;if(typeof document!=='undefined')boot();}
})(typeof globalThis!=='undefined'?globalThis:this);
