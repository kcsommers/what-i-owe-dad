import { ReactElement, useState } from 'react';

type TabsContainerProps = {
  tabNames: string[];
  tabContent: ReactElement[];
};

export const TabsContainer = ({ tabNames, tabContent }: TabsContainerProps) => {
  const [currentTab, setCurrentTab] = useState(0);

  return (
    <div>
      {tabNames &&
        tabNames.map((tabName, i) => (
          <button key={`${tabName}-${i}`} onClick={() => setCurrentTab(i)}>
            <p>{tabName}</p>
          </button>
        ))}
      <div>{tabContent[currentTab]}</div>
    </div>
  );
};
