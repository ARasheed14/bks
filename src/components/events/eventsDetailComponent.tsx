import './eventsListComponent.css';

interface ContainerProps {
  
}

const EventsDetailsComponent: React.FC<ContainerProps> = () => {
  return (
    <div className="container">
      <strong>Test</strong>
      <p>Explore <a target="_blank" rel="noopener noreferrer" href="https://ionicframework.com/docs/components">UI Components</a></p>
    </div>
  );
};

export default EventsDetailsComponent;