"use client";
import { useModal } from "@hooks/useModal";
import { useCreate } from "@hooks/useCreate";
import { ContainerCreate } from "@components/ContainerCreate/ContainerCreate";
import { CreateNote } from "@components/CreateNote/CreateNote";
import { CreateWord } from "@components/CreateWord/CreateWord";
import { ErrorMessage } from "@components/ErrorMessage/ErrorMessage";
import { Header } from "@components/Header/Header";
import { Modal } from "@components/Modal/Modal";
import { NavLinks } from "@components/Header/NavLinks";
import { WorkOut } from "@components/WorkOut/WorkOut";
import { useWorkOut } from "@hooks/useWorkOut";

function Layout({ onSearch, children }: any) {
  const { modalIsOpen, modalCloseHanlder, modalOpenHandler } = useModal();
  const {
    openModalWorkOut,
    setOpenModalWorkOut,
    setListWords,
    listWords,
    loading,
  } = useWorkOut();
  const {
    handlerSubmit,
    handlerChangeValue,
    form,
    resetValues,
    sending,
    errorCreate,
    createOption,
    setCreateOption,
  } = useCreate();

  const chooseCreateOptionHandler = (option: "word" | "note" | "") => {
    setCreateOption(option);
    modalOpenHandler();
  };

  return (
    <>
      <Header>
        <NavLinks onOptionHandler={chooseCreateOptionHandler} />
      </Header>
      <main className="w-full p-4">{children}</main>
      <Modal
        isOpen={modalIsOpen}
        onClose={() => {
          resetValues();
          modalCloseHanlder();
          setOpenModalWorkOut(false);
        }}
      >
        {openModalWorkOut ? (
          <WorkOut
            listWords={listWords}
            setListWords={setListWords}
            loading={loading}
          />
        ) : (
          <ContainerCreate
            error={errorCreate}
            onError={() => <ErrorMessage msg={errorCreate} />}
          >
            {createOption === "word" && (
              <CreateWord
                onSubmit={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  handlerSubmit("word");
                  resetValues();
                  modalCloseHanlder();
                  onSearch("", true);
                }}
                onChangeValue={handlerChangeValue}
                form={form}
                sending={sending}
              />
            )}
            {createOption === "note" && (
              <CreateNote
                onSubmit={(e: React.MouseEvent<HTMLButtonElement>) => {
                  e.preventDefault();
                  handlerSubmit("note");
                  resetValues();
                  modalCloseHanlder();
                  onSearch("", true);
                }}
                onChangeValue={handlerChangeValue}
                form={form}
                sending={sending}
              />
            )}
          </ContainerCreate>
        )}
      </Modal>
      <button
        type="button"
        className="fixed right-14 p-3 bottom-5 w-15 h-15 bg-yellow-500 hover:bg-yellow-600 rounded-full"
        onClick={() => {
          setOpenModalWorkOut(true);
          modalOpenHandler();
        }}
      >
        Workout
      </button>
    </>
  );
}

export { Layout };
