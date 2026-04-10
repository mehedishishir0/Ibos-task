"use client";

import { ManageTestHeader } from "./Manage-test-header";
import BasicInformationForm from "./basic-Info-form";
import { BasicInfoSummary } from "./Basic-info-summary";
import { AddQuestionModal } from "./Add-question-modal";
import { useAppStore } from "@/store/useStore";

const ManageOnlineMain = () => {
  const { step, isBasicSubmitted, isEditMode } = useAppStore();

  return (
    <div className="container mt-14 pb-40">
      <ManageTestHeader />

      {/* STEP 1 */}
      {step === 1 && (
        <>
          {isBasicSubmitted && !isEditMode ? (
            <BasicInfoSummary />
          ) : (
            <BasicInformationForm />
          )}
        </>
      )}

      {/* STEP 2 */}
      {step === 2 && <AddQuestionModal />}
    </div>
  );
};

export default ManageOnlineMain;