import Modal from "@/Components/Modal";

export const ModalView = ({ openModal, closeModal, children, title, maxWidth }) => {
    return (
        <Modal show={openModal} onClose={closeModal} maxWidth={maxWidth}>
            <div className="w-full rounded-lg p-4">
                {title && <div className="font-bold text-lg mb-4 border-b-2">{title}</div>}
                {children}
            </div>
        </Modal>
    );
}
