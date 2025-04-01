import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"

const WorkoutLogger = () => {
    const [activeTab, setActiveTab] = useState("logger");

  return (
    <>
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full max-w-3xl mx-auto">
      <TabsList className="grid w-full grid-cols-2 mb-6">
        <TabsTrigger value="logger">Workout</TabsTrigger>
        <TabsTrigger value="history">History</TabsTrigger>
      </TabsList>      
    </Tabs>
    </>
  );
};

export default WorkoutLogger;
