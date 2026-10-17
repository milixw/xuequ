/* 单词补充资料：不改词头、原释义、进度或拼写答案。 */
(function(root){
  'use strict';
  function key(word){return String(word || '').trim().toLowerCase().replace(/[’‘]/g,"'").replace(/\s+/g,' ');}
  function esc(text){return String(text || '').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));}
  function data(){return root.GreenVocabularyData || {entries:{},phrases:[]};}
  function entry(word){const d=data(),k=key(word);return d.entries[k] || d.entries[d.aliases && d.aliases[k]] || null;}
  function examples(word){const e=entry(word);return e && e.examples || [];}
  function mergeSenses(senses){
    const groups=new Map();
    for(const sense of senses || []){
      const pos=String(sense.pos||'');
      const tags=pos.toLowerCase().match(/(?:adj|adv|prep|pron|conj|num|art|int|aux|vi|vt|n|v)\./g);
      const k=tags?Array.from(new Set(tags)).sort().join('/'):pos.replace(/\s+/g,'').toLowerCase();
      if(!groups.has(k))groups.set(k,{pos,parts:[],seen:new Set()});
      const group=groups.get(k);let depth=0,part='';
      function add(){const text=part.trim();part='';if(!text)return;const normalized=text.replace(/[（]/g,'(').replace(/[）]/g,')').replace(/\s+/g,'');if(!group.seen.has(normalized)){group.seen.add(normalized);group.parts.push(text);}}
      for(const c of String(sense.cn||'')){
        if('([（【'.includes(c))depth++;
        if(')]）】'.includes(c))depth=Math.max(0,depth-1);
        if(!depth&&';；,，、'.includes(c))add();else part+=c;
      }
      add();
    }
    return Array.from(groups.values()).map(g=>({pos:g.pos,cn:g.parts.join('；')}));
  }
  function render(word, omitExamples){
    const e=entry(word);if(!e)return '';
    const sections=[];
    for(const [name,title] of [['synonyms','同／近义（按词义辨析）'],['antonyms','反义（对应具体含义）']]){
      if(e[name] && e[name].length)sections.push('<p><b>'+title+'：</b>'+e[name].map(x=>esc(x.en)+(x.meaning?'（'+esc(x.meaning)+'）':'')).join('；')+'</p>');
    }
    if(e.derivatives && e.derivatives.length)sections.push('<p><b>词形／词族扩展：</b>'+e.derivatives.map(x=>esc(x.en)+' '+esc(x.pos)+' '+esc(x.meaning)).join('；')+'</p>');
    if(e.inflections && e.inflections.length)sections.push('<p><b>屈折变化：</b>'+e.inflections.map(esc).join('，')+'</p>');
    if(e.collocations && e.collocations.length)sections.push('<p><b>常用搭配：</b>'+e.collocations.map(x=>esc(x.en)+(x.meaning?' — '+esc(x.meaning):'')).join('；')+'</p>');
    const shown=(e.examples || []).filter(x=>!(omitExamples || []).includes(x.en));
    if(shown.length)sections.push('<div class="vocabulary-details-examples"><b>原创例句：</b>'+shown.map(x=>'<p>'+esc(x.en)+'<br><span class="example-zh">'+esc(x.zh)+'</span></p>').join('')+'</div>');
    if(!sections.length)return '';
    return '<details class="vocabulary-details"><summary>词汇拓展 · 待审核</summary>'+sections.join('')+
      '<p class="vocabulary-details-note">同／近义词不能在所有语境互换；词形扩展不是本词的拼写答案。'+
      (e.pages && e.pages.length ? '用法依据用户提供的2025词汇手册，PDF第'+e.pages.join('、')+'页。' : '')+
      '例句为原创或已有原创例句；资料待英语教师审核。</p></details>';
  }
  function phraseKey(phrase){return key(phrase).replace(/[.,]/g,'').replace(/\b(?:somebody|someone)\b/g,'sb').replace(/\bsomething\b/g,'sth').replace(/\s+/g,' ');}
  function mergePhrases(existing){
    const merged=existing.map(p=>({...p}));const seen=new Map(merged.map((p,i)=>[phraseKey(p.en),i]));
    for(const p of data().phrases){
      const k=phraseKey(p.en);if(seen.has(k)){const item=merged[seen.get(k)];item.greenBook=true;item.greenPages=p.pages;continue;}
      seen.set(k,merged.length);merged.push({en:p.en,cn:p.meaning,cn_alt:'',src:'e',greenBook:true,greenAdded:true,greenPages:p.pages,ipa_uk:'',ipa_us:''});
    }
    return merged;
  }
  const api={key,entry,examples,render,phraseKey,mergePhrases,mergeSenses};
  if(typeof module!=='undefined' && module.exports)module.exports=api;
  else root.VocabularyDetails=api;
})(typeof globalThis!=='undefined'?globalThis:this);
