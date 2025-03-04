
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

type Tab = {
  id: string;
  label: string;
  content: React.ReactNode;
  icon?: React.ReactNode;
};

type TabsContainerProps = {
  tabs: Tab[];
  defaultValue?: string;
  className?: string;
  onChange?: (value: string) => void;
};

const TabsContainer = ({
  tabs,
  defaultValue,
  className,
  onChange,
}: TabsContainerProps) => {
  const [activeTab, setActiveTab] = useState(defaultValue || tabs[0]?.id || '');
  
  useEffect(() => {
    if (onChange) {
      onChange(activeTab);
    }
  }, [activeTab, onChange]);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  return (
    <Tabs
      defaultValue={activeTab}
      value={activeTab}
      onValueChange={handleTabChange}
      className={cn("w-full", className)}
    >
      <TabsList className="w-full border-b bg-transparent h-auto p-0 mb-6">
        <div className="flex items-center space-x-2 overflow-x-auto scrollbar-hide">
          {tabs.map((tab) => (
            <TabsTrigger
              key={tab.id}
              value={tab.id}
              className="tab-button bg-transparent data-[state=active]:bg-transparent data-[state=active]:shadow-none px-4 py-2"
            >
              {tab.icon && <span className="mr-2">{tab.icon}</span>}
              {tab.label}
            </TabsTrigger>
          ))}
        </div>
      </TabsList>
      
      {tabs.map((tab) => (
        <TabsContent
          key={tab.id}
          value={tab.id}
          className="animate-enter mt-0"
        >
          {tab.content}
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default TabsContainer;
