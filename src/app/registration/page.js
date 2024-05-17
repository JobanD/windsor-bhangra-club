import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";

// components
import DonateForm from "@/components/forms/DonateForm";
import JoinTeamForm from "@/components/forms/JoinTeamForm";
import RegistrationForm from "@/components/forms/RegistrationForm";

const Page = () => {
  return (
    <div className="container mx-auto my-8 p-4">
      <h1 className="text-4xl font-bold mb-6">Registration</h1>
      <Tabs defaultValue="donate">
        <TabsList>
          <TabsTrigger
            value="donate"
            className="m-2 px-4 py-2 border-black border-2"
          >
            Donate
          </TabsTrigger>
          <TabsTrigger
            value="joinTeam"
            className="m-2 px-4 py-2 border-black border-2"
          >
            Join Team
          </TabsTrigger>
          <TabsTrigger
            value="register"
            className="m-2 px-4 py-2 border-black border-2"
          >
            Registration
          </TabsTrigger>
        </TabsList>

        <TabsContent
          value="donate"
          className="mt-4 p-6 bg-secondary text-primary-dark rounded-lg shadow-md"
        >
          <DonateForm />
        </TabsContent>
        <TabsContent
          value="joinTeam"
          className="mt-4 p-6 bg-secondary text-primary-dark rounded-lg shadow-md"
        >
          <JoinTeamForm />
        </TabsContent>
        <TabsContent
          value="register"
          className="mt-4 p-6 bg-secondary text-primary-dark rounded-lg shadow-md"
        >
          <RegistrationForm />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Page;
