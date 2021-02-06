package com.developm8.treina.trainer

import android.app.AlertDialog
import android.content.Intent
import android.view.LayoutInflater
import android.view.View
import android.view.ViewGroup
import android.widget.TextView
import androidx.recyclerview.widget.RecyclerView
import com.developm8.treina.R
import com.developm8.treina.model.Client
import com.developm8.treina.model.TrainerExercice
import com.google.android.material.button.MaterialButton
import com.squareup.picasso.Picasso
import de.hdodenhof.circleimageview.CircleImageView

class MainTrainerExercicesAdapter(
    private val mDataset : List<TrainerExercice>,
    private val layoutInflater: LayoutInflater
) : RecyclerView.Adapter<MainTrainerExercicesAdapter.BaseViewHolder<*>>() {

    abstract class BaseViewHolder<T>(itemView: View, layoutInflater: LayoutInflater) : RecyclerView.ViewHolder(itemView) {
        abstract fun bind(item: T)

        class ClientViewHolder(val view: View, val layoutInflater: LayoutInflater) : BaseViewHolder<TrainerExercice>(view, layoutInflater) {
            private val exerciceTitle: TextView = view.findViewById(R.id.materialTextViewExerciceTitle)
            private val materialButtonSee: MaterialButton = view.findViewById(R.id.materialButtonSee)
            private val materialButtonDelete: MaterialButton = view.findViewById(R.id.materialButtonDelete)
            private val materialButtonEdit: MaterialButton = view.findViewById(R.id.materialButtonEdit)
            override fun bind(item: TrainerExercice) {
                this.exerciceTitle.text = item.title
                materialButtonSee.setOnClickListener {
                    val dialogBuilder: AlertDialog.Builder = AlertDialog.Builder(view.context)
                    val viewDialog: View = layoutInflater.inflate(R.layout.alert_dialog_trainer_myexercice_details, null)
                    val textViewDescription: TextView = viewDialog.findViewById(R.id.textViewDescription)
                    textViewDescription.text = item.description
                    dialogBuilder.setView(viewDialog).setTitle(item.title).setPositiveButton("Cerrar") { dialog, which -> dialog.dismiss() }
                    dialogBuilder.create().show()
                }
                materialButtonDelete.setOnClickListener {
                    val dialogBuilder: AlertDialog.Builder = AlertDialog.Builder(view.context)
                    dialogBuilder.setTitle(R.string.warning).setPositiveButton(R.string.confirm) {
                        dialog, which -> dialog.dismiss()
                    }
                    dialogBuilder.setNeutralButton(R.string.cancel) {
                        dialog, which -> dialog.dismiss()
                    }
                    dialogBuilder.setMessage(R.string.confirm_delete_message)
                    dialogBuilder.create().show()
                }
                materialButtonEdit.setOnClickListener {
                    val i: Intent = Intent(view.context, TrainerMyExerciceDetailsActivity::class.java)
                    view.context.startActivity(i)
                }
            }
        }

    }

    override fun onCreateViewHolder(parent: ViewGroup, viewType: Int): BaseViewHolder<*> {
        val view: View = LayoutInflater.from(parent.context).inflate(R.layout.item_main_trainer_exercices, parent, false)
        return BaseViewHolder.ClientViewHolder(view, layoutInflater)
    }

    override fun onBindViewHolder(holder: BaseViewHolder<*>, position: Int) {
        val item = mDataset[position]
        when(holder) {
            is BaseViewHolder.ClientViewHolder -> {
                holder.bind(item)
            }
        }
    }

    override fun getItemCount(): Int {
        return mDataset.size
    }

}