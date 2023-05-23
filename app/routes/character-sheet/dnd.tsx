export default function DnD() {
  const saveAllAsJson = (e:any) => {
    e.preventDefault()
  }

  return (
    <div>
      <h1>DND Character Sheet</h1>

      <div>
        <form action="" onSubmit={saveAllAsJson} className="flex flex-col gap-4">
          <button type="submit" > SAVE </button>
          <div className="flex flex-wrap gap-4">
            <fieldset>
              <label htmlFor="">Charactername</label>
              <input type="text"></input>
            </fieldset>
            <fieldset>
              <label htmlFor="">Klasse</label>
              <input type="text"></input>
            </fieldset>
            <fieldset>
              <label htmlFor="">Stufe</label>
              <input type="number"></input>
            </fieldset>
            <fieldset>
              <label htmlFor="">Erfahrungspunkte</label>
              <input type="number"></input>
            </fieldset>
            <fieldset>
              <label htmlFor="">Volk</label>
              <input type="text"></input>
            </fieldset>
          </div>

          <div>
            <h2>RETTUNGSWÜRFE:</h2>
            <div className="flex gap-2">
              <p>Stärke:</p>
              <p>10</p>
              <input type="checkbox"></input>
              {/* {strength} */}
            </div>
            <div className="flex gap-2">
              <p>Geschicklichkeit:</p>
              <p>10</p>
              <input type="checkbox"></input>
              {/* {strength} */}
            </div>
            <div className="flex gap-2">
              <p>Konstitution:</p>
              <p>10</p>
              <input type="checkbox"></input>
              {/* {strength} */}
            </div>
            <div className="flex gap-2">
              <p>Intelligenz:</p>
              <p>10</p>
              <input type="checkbox"></input>
              {/* {strength} */}
            </div>
            <div className="flex gap-2">
              <p>Weisheit:</p>
              <p>10</p>
              <input type="checkbox"></input>
              {/* {strength} */}
            </div>
            <div className="flex gap-2">
              <p>Charisma:</p>
              <p>10</p>
              <input type="checkbox"></input>
              {/* {strength} */}
            </div>
            
          </div>

          <div>
            <h2>FERTIGKEITEN:</h2>
            <div className="flex gap-2">
              <p>Stärke:</p>
              <p>10</p>
              <input type="checkbox"></input>
              {/* {strength} */}
            </div>
            <div className="flex gap-2">
              <p>Geschicklichkeit:</p>
              <p>10</p>
              <input type="checkbox"></input>
              {/* {strength} */}
            </div>
            <div className="flex gap-2">
              <p>Konstitution:</p>
              <p>10</p>
              <input type="checkbox"></input>
              {/* {strength} */}
            </div>
            <div className="flex gap-2">
              <p>Intelligenz:</p>
              <p>10</p>
              <input type="checkbox"></input>
              {/* {strength} */}
            </div>
            <div className="flex gap-2">
              <p>Weisheit:</p>
              <p>10</p>
              <input type="checkbox"></input>
              {/* {strength} */}
            </div>
            <div className="flex gap-2">
              <p>Charisma:</p>
              <p>10</p>
              <input type="checkbox"></input>
              {/* {strength} */}
            </div>
            <div className="flex gap-2">
              <p>Charisma:</p>
              <p>10</p>
              <input type="checkbox"></input>
              {/* {strength} */}
            </div>
            <div className="flex gap-2">
              <p>Charisma:</p>
              <p>10</p>
              <input type="checkbox"></input>
              {/* {strength} */}
            </div>
            <div className="flex gap-2">
              <p>Charisma:</p>
              <p>10</p>
              <input type="checkbox"></input>
              {/* {strength} */}
            </div>
            <div className="flex gap-2">
              <p>Charisma:</p>
              <p>10</p>
              <input type="checkbox"></input>
              {/* {strength} */}
            </div>
            <div className="flex gap-2">
              <p>Charisma:</p>
              <p>10</p>
              <input type="checkbox"></input>
              {/* {strength} */}
            </div>
            <div className="flex gap-2">
              <p>Charisma:</p>
              <p>10</p>
              <input type="checkbox"></input>
              {/* {strength} */}
            </div>
            <div className="flex gap-2">
              <p>Charisma:</p>
              <p>10</p>
              <input type="checkbox"></input>
              {/* {strength} */}
            </div>
            <div className="flex gap-2">
              <p>Charisma:</p>
              <p>10</p>
              <input type="checkbox"></input>
              {/* {strength} */}
            </div>
            <div className="flex gap-2">
              <p>Charisma:</p>
              <p>10</p>
              <input type="checkbox"></input>
              {/* {strength} */}
            </div>
            <div className="flex gap-2">
              <p>Charisma:</p>
              <p>10</p>
              <input type="checkbox"></input>
              {/* {strength} */}
            </div>
            <div className="flex gap-2">
              <p>Charisma:</p>
              <p>10</p>
              <input type="checkbox"></input>
              {/* {strength} */}
            </div>
            <div className="flex gap-2">
              <p>Charisma:</p>
              <p>10</p>
              <input type="checkbox"></input>
              {/* {strength} */}
            </div>
            
          </div>

          

          <button type="submit"> SAVE </button>
        </form>
      </div>
    </div>
  );
}
