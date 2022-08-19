import './App.css';
import SuggestionHeader from "./components/suggestion-header";
import Sidebar from './components/suggestion-sidebar';
import SuggestionContent from './components/suggestion-content';
import FeedbackDetail from './components/feedback-detail';
import AddFeedback from './components/addfeedback';
import React, { useState, useRef, useEffect } from 'react';
// import { useForm, Controller } from "react-hook-form";
import data from "./data/data.json"
import {v4 as myNewId} from "uuid";
import EditFeedback from './components/editfeedback';

import { BrowserRouter, Routes, Route } from "react-router-dom"

const buttons = [
  {
    type: "all",
    label: "All",
  },
  {
    type: "ui",
    label: "UI",
  },
  {
    type: "ux",
    label: "UX",
  },
  {
    type: "enhancement",
    label: "Enhancement",
  },
  {
    type: "bug",
    label: "Bug",
  },
  {
    type: "feature",
    label: "Feature",
  }
];

const categories = [
  {value: 'feature', label: 'feature'},
  {value: 'ui', label: 'ui'},
  {value: 'ux', label: 'ux'},
  {value: 'enhancement', label: 'enhancement'},
  {value: 'bug', label: 'bug'}
]

const options = [{ value: 'Most Upvotes', label: 'Most Upvotes'},
{ value: 'Least Upvotes', label: 'Least Upvotes'},
{ value: 'Most Comments', label: 'Most Comments'},
{ value: 'Least Comments', label: 'Least Comments'}];

const updates = [
  { value: 'Planned', label: 'Planned'},
  { value: 'In-progress', label: 'In-progress'},
  { value: 'Live', label: 'Live'}
]

function App() {
  const checkStorageItems = JSON.parse(window.localStorage.getItem("item"))
  const [suggestions, setSuggestions] = useState(checkStorageItems?checkStorageItems:data);
  const [feedbackDetailOpened, setFeedbackDetailOpened] = useState(false);
  const [addFeedbackOpened, setAddFeedbackOpened] = useState(false);
  const [editFeedbackOpened, setEditFeedbackOpened] = useState(false);
  // const [counterUpvotes, setCounterUpvotes] = useState(suggestions.map((item) => item.upvotes))
  const [updateStatus, setUpdateStatus] = useState(updates.filter((option) => option.label === "Planned"))
  const [feedbackCategories, setFeedbackCategories] = useState(categories.filter((option) => option.label === "feature"))

  const defaultValueIs = options.filter((option) => option.label === "Most Comments")
  const [selectedOption, setSelectedOption] = useState(defaultValueIs[0].label);
  const handleChange = (value) => {
    setSelectedOption(value.label);
  };
  const handleCategorySelected = (value) => {
    setFeedbackCategories(value)
  }
  const handleUpdateStatus = (value) => {
    setUpdateStatus(value)
  }
  // const filteredSuggestion = [];
  
  //Filter
  const [filterType, setFilterType] = useState("")
  const handleFilterItems = (type) => {
    setFilterType(type);
  };

  const filteredItems =
    !filterType || filterType === "all"
      ? suggestions
      : filterType === "ui"
      ? suggestions.filter((item) => item.category === "ui")
      : filterType === "ux"
      ? suggestions.filter((item) => item.category === "ux")
      : filterType === "enhancement"
      ? suggestions.filter((item) => item.category === "enhancement")
      : filterType === "bug"
      ? suggestions.filter((item) => item.category === "bug")
      : suggestions.filter((item) => item.category === "feature");

  
  
  const handleSuggestionClick = ({id}) => {
    if(!feedbackDetailOpened){
      console.log("last testing: ", suggestions)
      // Переписывай на routes! id через url будешь передавать, useState даже не нужны будут
      // Дизайн обучалки секретный энсвер лучше красиво подать и в модалке текст по центру
      // const filteredSuggestion = data.map((req) => req.productRequests.filter((item) => item.id === id))
      const filteredSuggestion = suggestions.find((item) => item.id === id)
      // const filteredCheckStorageItems = checkStorageItems.find((item) => item.id === id)

      setSuggestions(filteredSuggestion)
      
    }
    
      // const filteredSuggestion = suggestions
    else setSuggestions(checkStorageItems?checkStorageItems:data)
    
    if(editFeedbackOpened){
      setEditFeedbackOpened(false)
      // setFeedbackDetailOpened(!feedbackDetailOpened)
      // setAddFeedbackOpened(!addFeedbackOpened)
    }

    setFeedbackDetailOpened(!feedbackDetailOpened)
    
    // console.log("edit: ", editFeedbackOpened)
  }

  const handleAddFeedbackClick = () => {
    setAddFeedbackOpened(!addFeedbackOpened)
  }
  const handleEditFeedbackClick = ({id}) => {


    if(!editFeedbackOpened){
      setSuggestions(checkStorageItems?checkStorageItems:data) 
      const filteredSuggestion = suggestions.find((item) => item.id === id)
      
      setSuggestions(filteredSuggestion) 
    }
    
    setFeedbackDetailOpened((prevFeedback)=>!prevFeedback)
    setEditFeedbackOpened((prevEditFeedback)=>!prevEditFeedback)
  }
  
  //Counter upvotes
  const addPlusOneUpvote = ({id}) => {
    // event.stopPropagation();
    // event.nativeEvent.stopImmediatePropagation();
    
    const addPlusOneItem = suggestions.map((item)=>{
      if (item.id === id){
        return {...item, upvotes: item.upvotes + 1};
      } else return item;
    })
    setSuggestions(addPlusOneItem)

    const storageNewItem = JSON.stringify(addPlusOneItem);
    localStorage.setItem('item', storageNewItem);
  }

  //Adding new feedback
  const [newFeedbackTitle, setNewFeedbackTitle] = useState("");
  const [showError, setShowError] = useState(false)
  const [showErrorName, setShowErrorName] = useState(false)
  const [showErrorComment, setShowErrorComment] = useState(false)
  const handleNewFeedbackTitle = (event) => {
    setNewFeedbackTitle(event.target.value)
  }
  const [newFeedbackDetail, setNewFeedbackDetail] = useState("")
  const handleNewFeedbackDetail = (event) => {
    setNewFeedbackDetail(event.target.value)
  }
  const nameRef = useRef()
  const detailRef = useRef()
  const commentRef = useRef()

  const handleAddNewFeedbackClick = () => {
    // const filteredSuggestion = data[0].productRequests
    // console.log(filteredSuggestion)
    console.log(newFeedbackTitle);
    console.log("testing: ", feedbackCategories);
    console.log(newFeedbackDetail);
    const newItem = {"id": myNewId(), "title": newFeedbackTitle, "category": feedbackCategories.label?feedbackCategories.label:"feature", "upvotes": 0, "status": "suggestion", "description": newFeedbackDetail, "comments": [] };
    if(newFeedbackDetail !== "" && newFeedbackTitle !== ""){
      setSuggestions((prevElements) => [newItem, ...prevElements])
      const storageNewItem = JSON.stringify([newItem, ...suggestions]);
      localStorage.setItem('item', storageNewItem);
      handleAddFeedbackClick()

      setNewFeedbackTitle("")
      setNewFeedbackDetail("")
      setFeedbackCategories(categories.filter((option) => option.label === "feature"))
    }
    if (newFeedbackDetail === ""){
      setShowError(true)
      detailRef.current.focus();
      detailRef.current.style.border = "1px solid red";
    }
    else {
      setShowError(false)
      detailRef.current.style.border = "none";
    }
      if (newFeedbackTitle === ""){
      setShowErrorName(true)
      nameRef.current.focus();
      nameRef.current.style.border = "1px solid red";
    }
    else {
      setShowErrorName(false)
      nameRef.current.style.border = "0.5px solid black";
    }
    
    
  }
  
  const handleEditFeedback = (id) => {
    console.log(newFeedbackTitle);
    console.log(newFeedbackDetail);
    console.log(feedbackCategories.label);
    console.log(updateStatus.label);
    console.log("suggestions: ", suggestions)
    console.log(id);
    if(newFeedbackDetail !== "" && newFeedbackTitle !== ""){
      const newTabs = [...checkStorageItems?checkStorageItems:data];
      // console.log("testingL: ", suggestions);
      const indexOfElement = newTabs.findIndex((obj) => obj.id===id);
      // console.log("newTabs: ", indexOfElement);
      newTabs[indexOfElement].title = newFeedbackTitle;
      // console.log("index of : ", indexOfElement);
      newTabs[indexOfElement].category = feedbackCategories.label?feedbackCategories.label:"feature";
      newTabs[indexOfElement].status = updateStatus.label?updateStatus.label:"Planned";
      newTabs[indexOfElement].description = newFeedbackDetail;
      console.log(newTabs)
    setSuggestions(newTabs)
    // console.log(newTabs)
    const storageNewItem = JSON.stringify(newTabs);
    localStorage.setItem('item', storageNewItem);
    setNewFeedbackTitle("")
    setNewFeedbackDetail("")
    setFeedbackCategories(categories.filter((option) => option.label === "feature"))
    }
    if (newFeedbackDetail === ""){
      setShowError(true)
      detailRef.current.focus();
      detailRef.current.style.border = "1px solid red";
    }
    else {
      setShowError(false)
      detailRef.current.style.border = "none";
    }
      if (newFeedbackTitle === ""){
      setShowErrorName(true)
      nameRef.current.focus();
      nameRef.current.style.border = "1px solid red";
    }
    else {
      setShowErrorName(false)
      nameRef.current.style.border = "0.5px solid black";
    }
  }

  //Comments
  const [newComment, setNewComment] = useState("");
    const [limit, setLimit] = useState(250);
    const handleAddComment = (event) =>{
        setNewComment(event.target.value.slice(0, 250))
        setLimit(limit-1)
    }
  const AddComment = ({id}) => {
    if(newComment !== ""){
      const newTabs = [...checkStorageItems?checkStorageItems:data];
      // console.log("testingL: ", suggestions);
      const newItem = {"id": myNewId(), "content": newComment, "user": {"image": "./assets/user-images/image-suzanne.jpg", "name": "Suzanne Chang", "username": "upbeat1811"}};
      const indexOfElement = newTabs.findIndex((obj) => obj.id===id);
      // console.log("newTabs: ", indexOfElement);
      newTabs[indexOfElement].comments.push(newItem);
      setSuggestions(newTabs)
    // console.log(newTabs)
    const storageNewItem = JSON.stringify(newTabs);
    localStorage.setItem('item', storageNewItem);
    setNewComment("")
    }
    if (newComment === ""){
      setShowErrorComment(true)
      commentRef.current.focus();
      
    }
    else {
      setShowErrorComment(false)
      
    }
  }

  //replies
  // console.log(data.map(com => com.comments.map(comment => comment.id === 1)));
  // data.filter((el) => el.id === reply.productId)[0].comments.filter((el) => el.id === reply.commentId)[0]
  // console.log(data.filter((el) => el.id === reply.productId)[0].comments.filter((el) => el.id === reply.commentId)[0])
  // console.log(data && data.comments.map((comment) => comment.id));
  // console.log(reply);
  // const isReplying = reply && reply.type === 'replying' && data.comments?.map((comment) => comment.id) === reply.id;
  
  //undefined Edit
  // const { handleSubmit, control, setValue } = useForm();
  
    // const onSubmitData = (data) => {
    //   setDebug(data.controlledSelect.label)
    //   setDebug2(data.controlledSelectVal.label)
    // };

    // const handleChanged = (change) => {
    //     setValue("controlledSelect", change, {
    //     shouldDirty: true
    //     });
    //     setFeedbackCategories(change)
    // };
    // const handleChanged2 = (change) => {
    //     setValue("controlledSelectVal", change, {
    //     shouldDirty: true
    //     });
    //     setUpdateStatus(change)
    // };

  // const editUpvote = ({id}) => {
  //   const newTabs = [...data];
  //     const indexOfElement = newTabs.findIndex(obj=>obj.id===id);
  //     newTabs[indexOfElement].upvotes++;
      
  //   setSuggestions(newTabs)
  useEffect(() => {
    if (!window.localStorage.getItem("item")) {
        window.localStorage.setItem(
            "item",
            JSON.stringify(data)
        );
    }
}, []);
  //   const storageNewItem = JSON.stringify(newTabs);
  //   localStorage.setItem('item', storageNewItem);
  // }
  // console.log("suggestions", suggestions)
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
          path='/:id'
          element={
            <FeedbackDetail setSuggestions={setSuggestions} addPlusOneUpvote={addPlusOneUpvote} showErrorComment={showErrorComment} AddComment={AddComment} newComment={newComment} handleAddComment={handleAddComment} limit={limit} handleEditFeedbackClick={handleEditFeedbackClick} handleSuggestionClick={handleSuggestionClick} data={suggestions}/>
          }
          />
          <Route
          path='/addfeedback'
          element={<AddFeedback nameRef={nameRef} detailRef={detailRef} showErrorName={showErrorName} showError={showError} handleAddNewFeedbackClick={handleAddNewFeedbackClick} newFeedbackDetail={newFeedbackDetail} handleNewFeedbackDetail={handleNewFeedbackDetail} newFeedbackTitle={newFeedbackTitle} handleNewFeedbackTitle={handleNewFeedbackTitle} handleAddFeedbackClick={handleAddFeedbackClick} handleCategorySelected={handleCategorySelected} categories={feedbackCategories} options={categories}/>}
          />
          <Route
          path='/editfeedback/:id'
          element={<EditFeedback handleSuggestionClick={handleSuggestionClick} nameRef={nameRef} detailRef={detailRef} showErrorName={showErrorName} showError={showError} newFeedbackDetail={newFeedbackDetail} handleNewFeedbackDetail={handleNewFeedbackDetail} handleNewFeedbackTitle={handleNewFeedbackTitle} newFeedbackTitle={newFeedbackTitle} handleEditFeedback={handleEditFeedback} handleUpdateStatus={handleUpdateStatus} updateStatus={updateStatus} updates={updates} options={categories} categories={feedbackCategories} handleCategorySelected={handleCategorySelected} data={suggestions} handleAddFeedbackClick={handleAddFeedbackClick} handleEditFeedbackClick={handleEditFeedbackClick}/>}
          />
          <Route
          path='/'
          element={<div className="suggestion-components">
          <Sidebar filterType={filterType} handleFilterItems={handleFilterItems} buttons={buttons}/>
          <div className='right-bar'><SuggestionHeader handleAddFeedbackClick={handleAddFeedbackClick} handleChange={handleChange} options={options} selectedOption={selectedOption}/>
          <SuggestionContent selectedOption={selectedOption} addPlusOneUpvote={addPlusOneUpvote} data={filteredItems} handleSuggestionClick={handleSuggestionClick} handleAddFeedbackClick={handleAddFeedbackClick}/>
          </div>
          </div>}
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
