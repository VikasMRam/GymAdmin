import
  React from 'react';
import styled from 'styled-components';
import { object, func, bool } from 'prop-types';

import { size } from 'sly/components/themes';
import CollapsibleSection from "sly/components/molecules/CollapsibleSection";
import Field from "sly/components/molecules/Field";
import IconButton from "sly/components/molecules/IconButton";


const SectionWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  border: solid 1px;
  padding: ${size('spacing.large')};
`;

const tocs = [
  {label:'All Communities',value:'retirement-community'},
  {label:'Assisted Living',value:'assisted-living'},
  {label:'Independent Living',value:'independent-living'},
  {label:'Memory Care',value:'alzheimers-care'},
];

const communitySizes = [
  {label:'Small',value:'small'},
  {label:'Medium',value:'medium'},
  {label:'Large',value:'large'},
];

const budgets = [
  { label:"Up to $2500",value:2500},
  { label:"Up to $3000",value:3000},
  { label:"Up to $3500",value:3500},
  { label:"Up to $4000",value:4000},
  { label:"Up to $4500",value:4500},
  { label:"Up to $5000",value:5000},
  { label:"Up to $5500",value:5500},
  { label:"Up to $6000",value:6000},
];

const getEvtHandler = (changedParams,origFn) => {

  return (uiEvt)=>{
    origFn({origUiEvt:uiEvt,changedParams});

  };
};

const getSortHandler = (origFn) => {
  return (uiEvt)=>{
    let changedParams ={sort:uiEvt.target.value};
    origFn({origUiEvt:uiEvt,changedParams});
  };
};

const CommunityFilterList = ({ toggleMap, searchParams, onFieldChange }) => {

  const { toc, size, budget, sort, view } = searchParams;
  const isMapView  = () =>{
    return view === 'map'
  }
  const intBudget = parseInt(budget);

  const tocFields = tocs.map((elem)=>
    <Field name={'toc'} id={elem.value} key={`toc-${elem.value}`} onChange={getEvtHandler({ 'toc':elem.value},onFieldChange)}
           type={'radio'} value={elem.value} label={elem.label} checked={elem.value===toc} />
  );
  const budgetFields = budgets.map((elem)=>
    <Field name={'budget'} id={`budget-${elem.value}`} key={`budget-${elem.value}`} onChange={getEvtHandler({ 'budget':elem.value},onFieldChange)}
           type={'radio'} value={elem.value} label={elem.label} checked={elem.value===intBudget}/>
  );
  const sizeFields = communitySizes.map((elem)=>
    <Field name={'size'} id={`size-${elem.value}`} key={`size-${elem.value}`} onChange={getEvtHandler({ 'size':elem.value},onFieldChange)}
           type={'radio'} value={elem.value} label={elem.label} checked={elem.value===size}/>
  );
  return (
    <SectionWrapper>
      {isMapView() && toggleMap && <IconButton icon={'list'} onClick={toggleMap}>
        Show List
      </IconButton>}
      {!isMapView() && <IconButton icon={'map'} onClick={toggleMap} >
        Show Map
      </IconButton>}
      <CollapsibleSection size={'small'} title={"Type of Care"} >
        {tocFields}
      </CollapsibleSection>
      <CollapsibleSection collapsedDefault={true} size={'small'} title={"Maximum Starting Rate"}>
        {budgetFields}
      </CollapsibleSection>
      <CollapsibleSection size={'small'} title={"Size"}>
        {sizeFields}
      </CollapsibleSection>
      <CollapsibleSection size={'small'} title={"Sort"}>
        <Field name={'Sort'} type={'select'} onChange={getSortHandler(onFieldChange)}>
          <option selected={sort==='price-l-h'} value={'price-l-h'}>Price: Low to High</option>
          <option selected={sort==='price-h-l'} value={'price-h-l'}>Price: High to Low</option>
          <option selected={sort==='distance'}  value={'distance'}>Distance</option>
          <option selected={sort==='relevance'} value={'relevance'}>Relevance</option>
        </Field>
      </CollapsibleSection>

    </SectionWrapper>
  );
};

CommunityFilterList.propTypes = {
  toggleMap:func.isRequired,
  isMapView:bool.isRequired,
  searchParams:object.isRequired,
  onFieldChange:func.isRequired,

};

export default CommunityFilterList;
