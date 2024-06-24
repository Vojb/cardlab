// CreateTeamPage.tsx

import React, { useEffect, useState } from "react";
import { TextField, Button } from "@mui/material"; // Assuming you're using Material-UI
import "../App.scss"; // Adjust path based on your project structure
import { addTeam, deleteTeam, getAllTeams } from "../components/indexedDb";
import styles from "./home.module.scss";

interface Team {
  name: string;
  origin: string;
  logoUrl: string;
  country: string;
  division: string;
}

const CreateTeamPage: React.FC = () => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [team, setTeam] = useState<Team>({
    name: "FC Möllan",
    origin: "Malmö",
    logoUrl: "https://staticcdn.svenskfotboll.se/img/teams/6879.png",
    country: "Sverige",
    division: "Division 5",
  });

  const handleChange = (field: keyof Team, value: string) => {
    setTeam((prevTeam) => ({
      ...prevTeam,
      [field]: value,
    }));
  };
  useEffect(() => {
    const fetchData = async () => {
      const data = await getAllTeams();
      const list: Team[] = [];
      data.forEach(async (item) => {
        list.push(item.team);
      });

      setTeams(list);
    };

    fetchData();
  }, []);

  return (
    <div className="create-team-page">
      <TextField
        fullWidth
        label="Namn"
        value={team.name}
        variant="filled"
        onChange={(e) => handleChange("name", e.target.value)}
      />
      <TextField
        fullWidth
        label="Födelseort"
        value={team.origin}
        variant="filled"
        onChange={(e) => handleChange("origin", e.target.value)}
      />
      <TextField
        fullWidth
        label="Logotyp URL"
        value={team.logoUrl}
        variant="filled"
        onChange={(e) => handleChange("logoUrl", e.target.value)}
      />
      <TextField
        fullWidth
        label="Land"
        value={team.country}
        variant="filled"
        onChange={(e) => handleChange("country", e.target.value)}
      />
      <TextField
        fullWidth
        label="Division"
        value={team.division}
        variant="filled"
        onChange={(e) => handleChange("division", e.target.value)}
      />
      {/* Example of a button to submit or perform an action */}
      <Button
        variant="contained"
        onClick={async () => {
          await addTeam({
            team,
          });
        }}
      >
        Lägg till lag
      </Button>
      <div className={styles.teams}>
        {teams.map((item, index) => {
          console.log(item);
          return (
            <div>
              <p>{item.name}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default CreateTeamPage;
