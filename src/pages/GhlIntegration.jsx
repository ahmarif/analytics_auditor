import { useEffect, useState } from "react";
import IntegrationCard from "../components/IntegrationCard";
import toast from "react-hot-toast";
import Spinner from "../components/Spinner";
import {
  fetchConnectionLog,
  connectIntegration,
  disconnectIntegration,
} from "../service/integrationService";

function GhlIntegration() {
  const [connectionLog, setConnectionLog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingAction, setLoadingAction] = useState(null);

  const loadConnections = async () => {
    setLoading(true);
    try {
      const data = await fetchConnectionLog();

      if (data.ghl && Array.isArray(data.ghl)) {
        data.ghl.forEach((account) => {
          const key = `ghlToastShown:${account.location_id}`;
          if (account.access_token && !sessionStorage.getItem(key)) {
            toast.success("GHL account connected successfully!");
            sessionStorage.setItem(key, "true");
          }
        });
      }

      setConnectionLog(data);
    } catch (err) {
      console.error(err);
      toast.error("Failed to fetch connection log.");
      setConnectionLog({ error: err.message });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadConnections();
  }, []);

  const handleGhlConnect = async () => {
    setLoadingAction("connect");
    try {
      await connectIntegration("ghl", "ghl-integration");
    } catch (err) {
      console.error(err);
      toast.error("Error connecting GHL account.");
    } finally {
      setLoadingAction(null);
    }
  };

  const handleGhlDisconnect = async (location_id) => {
    setLoadingAction(`disconnect:${location_id}`);
    try {
      await disconnectIntegration(`ghl/${location_id}`);
      sessionStorage.removeItem(`ghlToastShown:${location_id}`);
      toast.success("GHL account disconnected successfully!");
      await loadConnections();
    } catch (err) {
      console.error(err);
      toast.error("Error disconnecting GHL account.");
    } finally {
      setLoadingAction(null);
    }
  };

  return (
    <div className="p-6">
      {loading ? (
        <div className="flex justify-center items-center h-[60vh]">
          <Spinner />
        </div>
      ) : (
        <IntegrationCard
          title="Go High Level"
          description="Connect your GHL accounts to manage automation."
          multipleAccounts={connectionLog?.ghl || []}
          onConnect={handleGhlConnect}
          onDisconnect={handleGhlDisconnect}
          addAccountLabel="Add Another GHL Account"
          loadingAction={loadingAction}
        />
      )}
    </div>
  );
}

export default GhlIntegration;
