import classnames from 'classnames';
import { ReactElement, useState } from 'react';
import styles from './TabsContainer.module.scss';

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
          <button
            key={`${tabName}-${i}`}
            className={classnames(
              styles.tab_btn,
              'bg-gray-400 p-1 mr-1 cursor-pointer',
              { [styles.active_tab]: i === currentTab }
            )}
            onClick={() => setCurrentTab(i)}
          >
            <p>{tabName}</p>
          </button>
        ))}
      <div>{tabContent[currentTab]}</div>
    </div>
  );
};
