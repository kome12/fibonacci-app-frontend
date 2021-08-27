import Button from '@material-ui/core/Button'
import "./GardenView.css";

export const GardenView = () => {
  const dummyRulesData = [{id:1, name:"Wake up at 7am", description: "I got out of bed on time!", gardenId: 1}, {id:2, name:"Go to bed at 11pm", description: "I got into bed on time!", gardenId: 1}]
  
  return (
    <div className="garden-view-container">
      <h1>Garden View</h1>
      <div className="garden-container">Garden Box</div>
      <div className="rules-container">
        <h2>Daily Goals:</h2>
        {dummyRulesData.map((rule, index) => {
          return (
            <div key={index}>
              <div className="rule-name">{rule.name}</div>
              <Button variant="contained">
              <div className="rule-description">{rule.description}</div>
              </Button>
            </div>
          )
        })}
      </div>
    </div>
  )
}
