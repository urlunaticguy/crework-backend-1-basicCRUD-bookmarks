import { React, useState, useEffect, useRef } from "react";
import axios from "axios";
import colors from "../Utils/colors";

function Home() {
  const [second, setsecond] = useState([]);
  const refOne = useRef(null);
  const refTwo = useRef(null);
  const refInput = useRef(null);
  let localArray = [];

  let postData = () => {
    if (refOne.current.value != "" && refTwo.current.value != "") {
      let bookmarkTitle = refOne.current.value;
      let bookmarkURL = refTwo.current.value;
      axios
        .post("http://localhost:3000/postNew", {
          name: bookmarkTitle,
          url: bookmarkURL,
        })
        .then((response) => {
          localArray = response.data.hardData;
          setsecond([...localArray]);
        })
        .catch((error) => {
          console.log(error);
        });
      refOne.current.value = "";
      refTwo.current.value = "";
    }
  };

  let deleteData = (i) => {
    axios
      .post("http://localhost:3000/delete", { deleteID: i })
      .then((response) => {
        localArray = response.data.hardData;
        setsecond([...localArray]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  let editData = (j) => {
    const inputDiv = refInput.current.children[j].children[0].children[1];
    const inputLinkDiv = refInput.current.children[j].children[0].children[2];
    const anchorDiv = refInput.current.children[j].children[0].children[0];
    const editButton = refInput.current.children[j].children[1].children[0];
    inputDiv.classList.toggle("hidden");
    inputLinkDiv.classList.toggle("hidden");
    anchorDiv.classList.toggle("hidden");
    if (editButton.innerHTML === "Edit") {
      editButton.innerHTML = "Save";
    } else if (editButton.innerHTML === "Save") {
      axios
        .post("http://localhost:3000/update", {
          newBKTitle: inputDiv.value,
          newBKLink: inputLinkDiv.value,
          changeIndex: j,
        })
        .then((response) => {
          localArray = response.data.hardData;
          setsecond([...localArray]);
        })
        .catch((error) => {
          console.log(error);
        });
      editButton.innerHTML = "Edit";
    }
  };

  useEffect(() => {
    let config = {
      method: "get",
      url: "http://localhost:3000/home",
    };
    axios(config)
      .then((response) => {
        localArray = response.data.hardData;
        setsecond([...localArray]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div>
      <div className=" lg:mb-[2rem] lg:w-[70rem] flex flex-col lg:flex-row justify-center items-center gap-[1rem]">
        <label className=" text-[1.2rem]">Bookmark Title</label>
        <input
          ref={refOne}
          className=" bg-[#a6a6a6] text-black rounded-md px-[0.5rem] w-[10rem]"
        ></input>
        <label className=" text-[1.2rem]">Bookmark URL</label>
        <input
          ref={refTwo}
          className=" bg-[#a6a6a6] text-black rounded-md px-[0.5rem] w-[25rem]"
        ></input>
        <button
          onClick={() => {
            postData();
          }}
          className=" cursor-pointer"
        >
          ADD BOOKMARK
        </button>
      </div>
      <div
        ref={refInput}
        className=" flex lg:flex-row lg:gap-x-[2rem] flex-wrap w-[70rem] justify-center items-center"
      >
        {second.map((data, index) => (
          <div
            key={index}
            className={`flex bg-[#1a1a1a] rounded-xl lg:w-[30rem] lg:h-[4.2rem] justify-between px-[1rem] + ${colors[index][2]}`}
          >
            <div className=" flex flex-col w-[100%] justify-center items-center">
              <a
                href={data[1]}
                target="_blank"
                className={` lg:text-[1.35rem] lg:w-[100%] cursor-pointer + ${colors[index][0]} + ${colors[index][1]}`}
              >
                {data[0]}
              </a>
              <input
                defaultValue={data[0]}
                className=" hidden w-[17rem] rounded-md flex text-center mb-[0.5rem]"
              ></input>
              <input
                defaultValue={data[1]}
                className=" hidden w-[17rem] rounded-md flex text-center"
              ></input>
            </div>
            <div className=" flex justify-center items-center">
              <button
                onClick={() => {
                  editData(index);
                }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  deleteData(index);
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
